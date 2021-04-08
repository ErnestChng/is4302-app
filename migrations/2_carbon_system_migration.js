const ERC20 = artifacts.require("ERC20");
const carbonCredit = artifacts.require("CarbonCredit");
const MarketPlace = artifacts.require("MarketPlace");


module.exports = function (deployer, network, accounts) {
    // for demonstration purpose: activeAccount will represent a Regulator and Validator
    const activeAccount = accounts[0];
    const marketplaceAccount = accounts[1];
    // let ccInstance;

    deployer.then(() => {
        return deployer.deploy(ERC20, {
            from: activeAccount
        });
    }).then(ERC20Instance => {
        console.log("ERC20 contract at address = " + ERC20Instance.address);
        return deployer.deploy(carbonCredit, {
            from: activeAccount // role of regulator is assigned to contractOwner by default
        });
    }).then(carbonCreditInstance => {
        ccInstance = carbonCreditInstance;
        // assign role of validator to activeAccount
        carbonCreditInstance.createValidator(activeAccount);
        console.log("Carbon Credit contract at address = " + carbonCreditInstance.address);
        return deployer.deploy(MarketPlace, carbonCreditInstance.address, {
            from: marketplaceAccount
        });
    }).then(MarketPlaceInstance => {
        // ccInstance.approve(marketplaceAccount, 300, {from: activeAccount}); //user approve marketplace to spend
        console.log("MarketPlace contract at address = " + MarketPlaceInstance.address);
    });
};
