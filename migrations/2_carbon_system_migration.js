const CarbonCredit = artifacts.require("CarbonCredit");
const MarketPlace = artifacts.require("MarketPlace");

module.exports = function (deployer, network, accounts) {
    const platform = accounts[0];
    let collectibleInstance;

    return deployer
        .then(() => {
            return deployer.deploy(CarbonCredit, {from: platform});
        }).then((_inst) => {
            collectibleInstance = _inst;
            return deployer.deploy(MarketPlace, collectibleInstance.address, {from: platform});
        });
};
