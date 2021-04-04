pragma solidity >0.5.0;

import "./token/ERC20/ERC20.sol";

contract CarbonCredit is ERC20 {

    // ==== VARIABLES ==== //
    address public contractOwner;

    struct Generator {
        uint id;
        uint tokenBalance;
        string generatorName;
        address generatorAddress;
    }

    struct Consumer {
        uint id;
        uint tokenBalance;
        uint emissions;
        string consumerName;
        address consumerAddress;
    }

    mapping(uint => Generator) allGenerators;
    mapping(uint => Consumer) allConsumers;
    mapping(address => bool) allValidators;

    mapping(uint => bool) generatorExists;
    mapping(uint => bool) consumerExists;

    uint[] consumerList;
    uint[] generatorList;
    uint[] violatorsList;
    uint numExceeded;

    // ==== CONSTRUCTOR ==== //
    constructor() public ERC20() {
        contractOwner = msg.sender;
    }

    // ==== MODIFIERS ==== //
    modifier isValidator() {
        require(allValidators[msg.sender] == true);
        _;
    }

    modifier isRegulator() {
        require(contractOwner == msg.sender);
        _;
    }

    // ==== GETTERS ==== //
    function getGenerator(uint generatorId) public view returns (bool) {
        return generatorExists[generatorId];
    }

    function getGeneratorList() public view returns (uint[] memory) {
        return generatorList;
    }

    function getConsumerList() public view returns (uint[] memory) {
        return consumerList;
    }

    function getViolators() public view returns (uint[] memory){// for consumers
        return violatorsList;
    }

    function getContractOwner() public view returns (address) {
        return contractOwner;
    }

    function getConsumerCredits(uint consumerId) public view returns (uint credit) {
        require(consumerExists[consumerId] == true);
        return (allConsumers[consumerId].tokenBalance);
    }

    function getGeneratorCredits(uint generatorId) public view returns (uint credit) {
        require(generatorExists[generatorId] == true);
        return (allGenerators[generatorId].tokenBalance);
    }

    function isGenerator(uint ID) public view returns (bool doesExist) {
        return (generatorExists[ID]);
    }

    function isConsumer(uint ID) public view returns (bool doesExist) {
        return (consumerExists[ID]);
    }

    function getConsumerName(uint consumerId) public view returns (string memory) {
        require(consumerExists[consumerId] == true);
        return (allConsumers[consumerId].consumerName);
    }

    function getConsumerEmission(uint consumerId) public view returns (uint emission) {
        require(consumerExists[consumerId] == true);
        return (allConsumers[consumerId].emissions);
    }

    // ==== FUNCTIONS ==== //
    function createGenerator(uint generatorId, string memory name, address thisAdd) public isRegulator {
        require(generatorExists[generatorId] == false);

        Generator memory newGenerator = Generator(
            generatorId,
            0,
            name,
            thisAdd
        );

        allGenerators[generatorId] = newGenerator;
        generatorExists[generatorId] = true;

        generatorList.push(generatorId);
    }

    function createConsumer(uint consumerId, string memory name, address thisAdd) public isRegulator {
        require(consumerExists[consumerId] == false);

        Consumer memory newConsumer = Consumer(
            consumerId,
            100,
            0,
            name,
            thisAdd
        );

        allConsumers[consumerId] = newConsumer;
        consumerExists[consumerId] = true;
        consumerList.push(consumerId);
    }

    function allocateCredit(uint generatorId, uint credit) public
        //    isValidator
    {
        require(generatorExists[generatorId] == true);
        require(credit > 0);

        _mint(allGenerators[generatorId].generatorAddress, credit);
        allGenerators[generatorId].tokenBalance += credit;
    }

    function reportEmissions(uint consumerId, uint emission) public
        //    isValidator
    {
        require(emission > 0);
        require(consumerExists[consumerId] == true);

        allConsumers[consumerId].emissions = emission;

        // Add consumerId to violatorsList if emissions exceed tokenBalance.
        if (emission > allConsumers[consumerId].tokenBalance) {
            violatorsList.push(consumerId);
        }
    }

    function updateConsumerBalance(uint consumerId, uint delta, bool subtract) public {
        require(consumerExists[consumerId] == true);

        if (subtract) {
            allConsumers[consumerId].tokenBalance -= delta;
        } else {
            allConsumers[consumerId].tokenBalance += delta;
        }
    }

    function updateGeneratorBalance(uint generatorId, uint delta, bool subtract) public {
        require(generatorExists[generatorId] == true);

        if (subtract) {
            allGenerators[generatorId].tokenBalance -= delta;
        } else {
            allGenerators[generatorId].tokenBalance += delta;
        }
    }

    function checkEmission() isRegulator public view returns (uint[] memory, uint[] memory, uint[] memory, uint[] memory) {
        // Returns 4 arrays: ID, balance, emissions and exceededBy. Same index corresponds to same company.
        uint resCount;

        for (uint i = 0; i < consumerList.length; i++) {
            uint thisID = consumerList[i];
            uint thisBalance = allConsumers[thisID].tokenBalance;
            uint thisEmission = allConsumers[thisID].emissions;

            if (thisEmission > thisBalance) {
                resCount ++;
            }
        }

        uint[] memory resID = new uint[](resCount);
        uint[] memory resBalance = new uint[](resCount);
        uint[] memory resEmission = new uint[](resCount);
        uint[] memory resExceededBy = new uint[](resCount);
        uint j = 0;

        for (uint i = 0; i < consumerList.length; i++) {
            uint thisID = consumerList[i];
            uint thisBalance = allConsumers[thisID].tokenBalance;
            uint thisEmission = allConsumers[thisID].emissions;

            if (thisEmission > thisBalance) {
                uint amtExceeded = thisEmission - thisBalance;
                resID[j] = thisID;
                resBalance[j] = thisBalance;
                resEmission[j] = thisEmission;
                resExceededBy[j] = amtExceeded;
                j++;
            }
        }

        return (resID, resBalance, resEmission, resExceededBy);
    }

}