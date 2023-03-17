// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "./Crowdlend.sol";

contract CrowdlendFactory {
    address[] public allCampaigns;

    constructor() {
    }

    function createCampaign(address _owner, uint32 _apy ,address _token, uint _goal, uint256 _startAt, uint256 _endAt) public returns (address campaignAddress) {
        Crowdlend newCampaign = new Crowdlend(_token);
        console.log(1);
        newCampaign.launch(_owner, _apy,_goal, _startAt, _endAt);
        console.log(5);
        campaignAddress = address(newCampaign);
        allCampaigns.push(campaignAddress);

        //event is thrown
        console.log(6);
    }

    function getAllCampaigns() public view returns (address[] memory) {
        return allCampaigns;
    }
}