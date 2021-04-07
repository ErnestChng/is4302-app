var ERC20 = artifacts.require("./ERC20.sol");
var carbonCredit = artifacts.require("./CarbonCredit.sol");
var marketPlace = artifacts.require("./MarketPlace.sol");


contract("carbonCredit", function (accounts) {

    let carbonCreditInstance;
    let MarketPlaceInstance;

    let regulator = accounts[0];
    let validator = accounts[1];
    let generator = accounts[2];
    let consumer = accounts[3];

    before(async () => {
        carbonCreditInstance = await carbonCredit.deployed({from: regulator});
        MarketPlaceInstance = await marketPlace.deployed({from: regulator});

        //Create validator
        await carbonCreditInstance.createValidator(validator);
    });

    //1. Create generator with balance = 0 if caller is regulator
    it('1. Should create generator', async () => {
        await carbonCreditInstance.createGenerator(11, "Tree Planting Inc.", generator, {
            from: regulator
        });

        let result;
        try {
            result = await carbonCreditInstance.getGeneratorCredits(11);
        } catch (e) {
        }

        //Balance should be 0
        assert.strictEqual(
            result.toNumber(),
            0,
            'Generator incorrectly created'
        );
    });

    //2. Create consumer with balance = 100 if caller is regulator
    it('2. Should create consumer', async () => {
        await carbonCreditInstance.createConsumer(21, "ExxonMobil", consumer, {
            from: regulator
        });

        let result;
        try {
            result = await carbonCreditInstance.getConsumerCredits(21);
        } catch (e) {
        }

        //Balance should be 0
        assert.strictEqual(
            result.toNumber(),
            100,
            'Consumer incorrectly created'
        );
    });

    //3. Allocate Credit to generators
    it('3. Should allocate credit', async () => {
        await carbonCreditInstance.allocateCredit(11, 100, {
            from: validator
        });

        let result;
        try {
            result = await carbonCreditInstance.getGeneratorCredits(11);
        } catch (e) {
        }

        //Balance should be 100
        assert.strictEqual(
            result.toNumber(),
            100,
            'Generator not allocated credits'
        );
    });

    //4. Report emissions
    it('4. Should Report Emissions', async () => {
        await carbonCreditInstance.reportEmissions(21, 20, {
            from: validator
        });

        let result;
        try {
            result = await carbonCreditInstance.getConsumerEmissions(21);
        } catch (e) {
        }

        //Balance should be 0
        assert.strictEqual(
            result.toNumber(),
            20,
            'Emissions not reported'
        );
    });

    //5. Update Consumer Balance
    it('5. Should update consumer balance', async () => {
        await carbonCreditInstance.updateConsumerBalance(21, 10, true);

        let result;
        try {
            result = await carbonCreditInstance.getConsumerCredits(21);
        } catch (e) {
        }

        //Balance should be 0
        assert.strictEqual(
            result.toNumber(),
            90,
            'Consumer balance not updated'
        );
    });

    //6. update generator balance
    it('6. Should update generator balance', async () => {
        await carbonCreditInstance.updateGeneratorBalance(11, 10, true);

        let result;
        try {
            result = await carbonCreditInstance.getGeneratorCredits(11);
        } catch (e) {
        }

        //Balance should be 0
        assert.strictEqual(
            result.toNumber(),
            90,
            'Generator balance not updated'
        );
    });

    //7. Check emission
    it('7. Should check emissions', async () => {
        await carbonCreditInstance.reportEmissions(21, 100, {
            from: validator
        });

        let check;
        try {
            check = await carbonCreditInstance.checkEmissions({
                from: regulator
            });
        } catch (e) {
        }

        assert.strictEqual(
            check,
            undefined,
            'Check emissions did not return result'
        );
    });

    //8. It should list credit
    it('8. Should list credits on marketplace', async () => {
        await carbonCreditInstance.approve(MarketPlaceInstance.address, 10, {
            from: generator
        });

        await MarketPlaceInstance.listCredit(11, 10, 10, {
            from: generator
        });

        let result;
        try {
            result = await carbonCreditInstance.getGeneratorCredits(11);
        } catch (e) {
        }

        assert.strictEqual(
            result.toNumber(),
            80,
            'Credits not listed'
        );
    });

    // TODO: fix test case 9
    //9. it should buy credits
    it('9. Should buy credits on marketplace', async () => {
        await MarketPlaceInstance.buyCredit(21, 10, {
            from: consumer
        });

        let result;
        try {
            result = await carbonCreditInstance.getConsumerCredits(21);
        } catch (e) {
        }

        assert.strictEqual(
            result.toNumber(),
            100,
            'Credits not bought'
        );
    });

});





