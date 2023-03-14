// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Crowdfund.sol";

contract CrowdfundFactory {
    address[] public allCampaigns;

    constructor() {
    }

    function createCampaign(address _token, uint _goal, uint32 _endAt) public {
        Crowdfund newCampaign = new Crowdfund(_token);
        newCampaign.launch(msg.sender, _goal, _endAt);
        allCampaigns.push(address(newCampaign));
    }

    function getAllCampaigns() public view returns (address[] memory) {
        return allCampaigns;
    }
}