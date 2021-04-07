pragma solidity ^0.5.0;

import "./CarbonCredit.sol";

contract MarketPlace {

    CarbonCredit carbonCredit;
    address public marketplaceOwner;

    struct listing {
        uint firmId;
        uint qty;
        bool isValue;
    }

    // {priceOfCredit: listing}
    mapping(uint => listing) creditsForSale;
    uint[] public prices;  // wont allow duplicate price listings
    uint numListings = 0;

    // ==== CONSTRUCTOR ==== //
    constructor(CarbonCredit carbonCredit_address) public {
        carbonCredit = carbonCredit_address;
        marketplaceOwner = msg.sender;
    }

    // ==== MODIFIERS ==== //
    modifier onlyConsumer(uint firmId) {
        require(carbonCredit.isConsumer(firmId));
        _;
    }

    modifier onlyGenerator(uint firmId) {
        require(carbonCredit.isGenerator(firmId));
        _;
    }

    // ==== FUNCTIONS ==== //
    // this gets added to the sorted list of prices. We will prevent people from listing
    function listCredit(uint firmId, uint price, uint quantity) public {
        bool consumer;

        if (carbonCredit.isConsumer(firmId)) {
            consumer = true;
            assert(carbonCredit.getConsumerCredits(firmId) >= quantity);
        } else if (carbonCredit.isGenerator(firmId)) {
            consumer = false;
            assert(carbonCredit.getGeneratorCredits(firmId) >= quantity);
        }

        assert(price > 0);
        // can only list positive price
        require(creditsForSale[price].isValue == false, "this price is already listed. Please go one up or one down.");
        // the price shouldn't exist in the dictionary. We only allow unique price listings.

        // create the mapping of the listing and add to creditsForSale mapping
        listing memory newListing = listing(firmId, quantity, true);
        creditsForSale[price] = newListing;

        // add the same thing to the list of prices, then sort
        prices.push(price);
        numListings += 1;
        insertionSort(prices, numListings);

        //transfer tokens from the seller to the marketplace
        carbonCredit.transferFrom(msg.sender, address(this), quantity);
        if (consumer) {
            carbonCredit.updateConsumerBalance(firmId, quantity, true);
        } else {
            carbonCredit.updateGeneratorBalance(firmId, quantity, true);
        }
    }

    function buyCredit(uint firmId, uint quantity) public onlyConsumer(firmId) returns (uint numFilled, uint avgPriceFilled) {
        // looks at creditsForSale and picks the lowest price.
        // this process is repeated until the entire buy order is satisfied
        assert(quantity > 0);
        assert(carbonCredit.isConsumer(firmId));

        uint filledSoFar = 0;
        uint totalPaid = 0;

        // while loop runs either until we fill the quantity, or we run out of listings
        while (filledSoFar < quantity) {
            if (prices[0] == 0 || numListings == 0) {// this is the case where there are no more listings

                // need to transfer contracts from marketplace to this firmId
                carbonCredit.transferFrom(address(this), msg.sender, filledSoFar);
                carbonCredit.updateConsumerBalance(firmId, quantity, false);

                if (filledSoFar == 0) {return (filledSoFar, 0);}
                else {return (filledSoFar, totalPaid / filledSoFar);}
            }

            uint currPrice = prices[0];
            uint currQty = creditsForSale[currPrice].qty;
            uint yetToFill = quantity - filledSoFar;

            if (currQty > yetToFill) {// this is the case where this is the last listing we have to look at
                filledSoFar += yetToFill;
                totalPaid += currPrice * yetToFill;
                creditsForSale[currPrice].qty -= yetToFill;
                // after this we break out of the loop
            }

            else if (currQty < yetToFill) {// if this listing is still not enough to completely fill our order
                filledSoFar += currQty;
                // assign all
                totalPaid += currPrice * currQty;

                // now we have to pop the array and re-sort
                delete prices[0];
                prices[0] = prices[numListings - 1];
                numListings -= 1;
                insertionSort(prices, numListings);

                delete creditsForSale[currPrice];
            }
        }

        // transfer contracts from marketplace to this firmId
        carbonCredit.transferFrom(address(this), msg.sender, filledSoFar);
        carbonCredit.updateConsumerBalance(firmId, quantity, false);

        return (filledSoFar, totalPaid / filledSoFar);

    }

    function insertionSort(uint[] memory data, uint numElems) internal pure {
        uint length = numElems;
        for (uint i = 1; i < length; i++) {
            uint key = data[i];
            uint j = i - 1;
            while ((int(j) >= 0) && (data[j] > key)) {
                data[j + 1] = data[j];
                j--;
            }

            data[j + 1] = key;
        }
    }

}