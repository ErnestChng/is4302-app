// const CarbonCredit = artifacts.require("CarbonCredit");
// const MarketPlace = artifacts.require("MarketPlace");
//
// module.exports = function (deployer, network, accounts) {
//     const platform = accounts[0];
//     let collectibleInstance;
//
//     return deployer
//         .then(() => {
//             return deployer.deploy(CarbonCredit, {from: platform});
//         }).then((_inst) => {
//             collectibleInstance = _inst;
//             return deployer.deploy(MarketPlace, collectibleInstance.address, {from: platform});
//         });
// };

const ERC20 = artifacts.require("ERC20");
const carbonCredit = artifacts.require("CarbonCredit");
const MarketPlace = artifacts.require("MarketPlace");

module.exports = function (deployer, network, accounts) {
    deployer.then(() => {
        return deployer.deploy(ERC20, {
            from: accounts[0]
        });
    }).then(ERC20Instance => {
        console.log("ERC20 contract at address = " + ERC20Instance.address);
        return deployer.deploy(carbonCredit, {
            from: accounts[0]
        });
    }).then(carbonCreditInstance => {
        console.log("Carbon Credit contract at address = " + carbonCreditInstance.address);
        return deployer.deploy(MarketPlace, carbonCreditInstance.address, {
            from: accounts[0]
        });
    }).then(MarketPlaceInstance => {
        console.log("MarketPlace contract at address = " + MarketPlaceInstance.address);
    });
};
