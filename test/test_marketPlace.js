var ERC20 = artifacts.require("./ERC20.sol");
var carbonCredit = artifacts.require("./CarbonCredit.sol");
var marketPlace = artifacts.require("./MarketPlace.sol");

contract("MarketPlace", function (accounts) {

    let carbonCreditInstance;
    let marketPlaceInstance;

    let regulator = accounts[0];
    let validator = accounts[1];
    let generator = accounts[2];
    let consumer = accounts[3];

    before(async () => {
        carbonCreditInstance = await carbonCredit.deployed({from: regulator});
        marketPlaceInstance = await marketPlace.deployed({from: regulator});

        //Create validator, generator and consumer
        await carbonCreditInstance.createValidator(validator);
        await carbonCreditInstance.createGenerator(11, "Generator 1", generator, {
            from: regulator
        });
        await carbonCreditInstance.createConsumer(21, "Consumer 2", consumer, {
            from: regulator
        });

        //Allocate generator credits
        await carbonCreditInstance.allocateCredit(11, 500, {
            from: validator
        });
    });

    //9. It should list credit 
    it('Should list credits on marketplace', async () => {
        await carbonCreditInstance.approve(marketPlaceInstance.address, 100, {
            from: generator
        });

        await marketPlaceInstance.listCredit(11, 100, 100, {
            from: generator
        });

        let result;
        try {
            result = await marketPlaceInstance.getNumListings();
        } catch (e) {
        }

        assert.strictEqual(
            result.toNumber(),
            1,
            'Credits not listed'
        );
    });

    it('Should return min index', async () => {
        //List second listing 
        await carbonCreditInstance.approve(marketPlaceInstance.address, 100, {
            from: generator
        });

        await marketPlaceInstance.listCredit(11, 120, 100, {
            from: generator
        });

        let priceList = await marketPlaceInstance.getPrices();

        let result = await marketPlaceInstance.getMinIdx(priceList);

        assert.strictEqual(
            result.toNumber(),
            0,
            'MinIdx not working'
        );
    });

    //10. it should buy credits
    it('Should buy credits on marketplace', async () => {
        //approve then buy
        await carbonCreditInstance.approve(marketPlaceInstance.address, 100, {
            from: regulator
        });

        await marketPlaceInstance.buyCredit(21, 100, {
            from: consumer
        });

        let credits = await carbonCreditInstance.getConsumerCredits(21);
        let numListing = await marketPlaceInstance.getNumListings();

        let result = (credits.toNumber() === 200 && numListing.toNumber() === 1);

        assert.strictEqual(
            result,
            true,
            'Credits not bought'
        );
    });

    //11. it should buy credits
    it('Should list credits after buying on marketplace', async () => {
        await carbonCreditInstance.approve(marketPlaceInstance.address, 100, {
            from: generator
        });

        await marketPlaceInstance.listCredit(11, 130, 100, {
            from: generator
        });

        let result;
        try {
            result = await marketPlaceInstance.getNumListings();
        } catch (e) {
        }

        assert.strictEqual(
            result.toNumber(),
            2,
            'Credits not listed'
        );
    });

});