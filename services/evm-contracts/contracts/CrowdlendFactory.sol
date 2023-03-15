// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "./Crowdlend.sol";

contract CrowdlendFactory {
    address[] public allCampaigns;

    constructor() {
    }

    function createCampaign(address _owner, address _token, uint _goal, uint32 _endAt) public returns (address campaignAddress) {
        Crowdlend newCampaign = new Crowdlend(_token);
        newCampaign.launch(_owner, _goal, _endAt);

        campaignAddress = address(newCampaign);
        allCampaigns.push(campaignAddress);
    }

    function getAllCampaigns() public view returns (address[] memory) {
        return allCampaigns;
    }
}