const CarbonCredit = artifacts.require("CarbonCredit");
const ERC20 = artifacts.require("ERC20");
//const MarketPlace = artifacts.require("MarketPlace");

module.exports = function (deployer, network, accounts) {
    const platform = accounts[0];
    let collectibleInstance;
    // let tokenInstance;

    return deployer
        .then(() => {
            return deployer.deploy(CarbonCredit, {from: platform});
        }).then((_inst) => {
            collectibleInstance = _inst;
            return deployer.deploy(ERC20, {from: platform});
        });
    // .then((_inst) => {
    //     tokenInstance = _inst;
    //     return deployer.deploy(CollectibleMarketPlace,
    //                           collectibleInstance.address,
    //                           tokenInstance.address,
    //                           100,
    //                           {from: platform});
    // });
};

