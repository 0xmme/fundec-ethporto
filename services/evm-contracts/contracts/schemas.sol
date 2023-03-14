// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

struct Campaign {
    address creator;
    uint goal;
    uint pledged;
    uint startAt;
    uint endAt;
    bool claimed;
}

enum CampaignState {
    OPEN,
    LAUNCHED,
    COMPLETED
}


