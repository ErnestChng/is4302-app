pragma solidity ^0.5.0;

import "./CarbonCredit.sol";

contract MarketPlace {

    CarbonCredit carbonCredit;

    // {priceOfCredit: {firmId: numberOfCredits}}
    mapping(uint => mapping(uint => uint)) creditsForSale;

    // constructor() {


    // }

    modifier onlyConsumer(uint firmId) {
        require(carbonCredit.isConsumer(firmId));
        _;
    }

    modifier onlyGenerator(uint firmId) {
        require(carbonCredit.isGenerator(firmId));
        _;
    }

    // function listCredit(uint firmId, uint price, uint quantity) onlyConsumer(firmId) onlyGenerator(firmId) {

    // }

    // function buyCredit(uint firmId, uint quantity) onlyConsumer(firmId) returns (uint numFilled, uint avgPriceFilled) {
    //     // looks at creditsForSale and picks the lowest price.
    //     // this process is repeated until the entire buy order is satisfied
    // }

}