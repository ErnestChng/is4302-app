var ERC20 = artifacts.require("./ERC20.sol");
var carbonCredit = artifacts.require("./CarbonCredit.sol");
var marketPlace = artifacts.require("./MarketPlace.sol")

contract("MarketPlace", function(accounts) {
    //let ERC20Instance;
    let carbonCreditInstance;
    let MarketPlaceInstance;

    let regulator = accounts[0];
    let validator = accounts[1];
    let generator = accounts[2];
    let consumer = accounts[3];

    before(async() => {

        carbonCreditInstance = await carbonCredit.deployed({
            from: regulator
        });

        MarketPlaceInstance = await marketPlace.deployed({
            from: regulator
        });

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

    })

    //9. It should list credit 
    it('Should list credits on marketplace', async() => {

        await carbonCreditInstance.approve(MarketPlaceInstance.address, 100, {
            from: generator
        });
        

        await MarketPlaceInstance.listCredit(11, 100, 100, {
            from: generator
        });

        let result 
        try{
            result = await MarketPlaceInstance.getNumListings();
        }catch(e){}
        

        assert.equal(
            result,
            1,
            'Credits not listed'
        );
    });

    it('Should return min index', async() => {

        //List second listing 
        await carbonCreditInstance.approve(MarketPlaceInstance.address, 100, {
            from: generator
        });

        await MarketPlaceInstance.listCredit(11, 120, 100, {
            from: generator
        });

        let priceList = await MarketPlaceInstance.getPrices();

        let result = await MarketPlaceInstance.getMinIdx(priceList);

        assert.equal(
            result, 
            0, 
            'MinIdx not working'
        )
        });

    //10. it should buy credits
    it('Should buy credits on marketplace', async() => {

        //approve then buy
        await carbonCreditInstance.approve(MarketPlaceInstance.address, 100, {
            from: regulator
        });

        await MarketPlaceInstance.buyCredit(21, 100, {
            from: consumer
        });

        let credits = await carbonCreditInstance.getConsumerCredits(21);
        let numListing = await MarketPlaceInstance.getNumListings();

        let result = (credits == 200 && numListing == 1);


        assert.equal(
            result,
            true,
            'Credits not bought'
        );
    });

});