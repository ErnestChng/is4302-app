var ERC20 = artifacts.require("./ERC20.sol");
var carbonCredit = artifacts.require("./CarbonCredit.sol");
var marketPlace = artifacts.require("./MarketPlace.sol");

contract("CarbonCredit", function (accounts) {

    let carbonCreditInstance;
    let marketPlaceInstance;

    let regulator = accounts[0];
    let validator = accounts[1];
    let generator = accounts[2];
    let consumer = accounts[3];

    before(async () => {
        carbonCreditInstance = await carbonCredit.deployed({from: regulator});
        marketPlaceInstance = await marketPlace.deployed({from: regulator});

        //Create validator
        await carbonCreditInstance.createValidator(validator);
    });

    //1. Create generator with balance = 0 if caller is regulator
    it('Should create generator', async () => {
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
    it('Should create consumer', async () => {
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

    //3. Allocate credit to generators
    it('Should allocate credit', async () => {
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

    //5. Report emissions
    it('Should report emissions', async () => {
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

    //6. Update Consumer Balance 
    it('Should update consumer balance', async () => {
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

    //7. update generator balance
    it('Should update generator balance', async () => {
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

    //8. Check emission 
    it('Should check emissions', async () => {
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

        assert.notStrictEqual(
            check,
            undefined,
            'Check emissions did not return result'
        );
    });

});

    



