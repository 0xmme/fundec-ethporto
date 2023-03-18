// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

import "../interfaces/IERC20.sol";
import "./schemas.sol";

/* Errors */
error Crowdlend__InvalidDate();
error Crowdlend__ErrorLaunchingCampaign();
error Crowdlend__ErrorPledging();
error Crowdlend__ErrorUnpledging();
error Crowdlend__ErrorClaiming();
error Crowdlend__ErrorRepaying();


contract Crowdlend is Ownable {
    /**
     * @dev This contract is designed to handle the logic for managing a 
     * single crowdlending campaign.
    */

    //----------------- STORAGE -----------------
    IERC20 public immutable token;
    Campaign public campaign;
    mapping(address => uint) public pledgedAmount;
    uint public totalPledgedAmount;
    CampaignState public state;

    //----------------- EVENTS ------------------
    event Launch(
        address indexed creator,
        uint32 apy,
        uint goal,
        uint256 startAt,
        uint256 endAt
    );
    event Cancel();
    event Pledge(address indexed caller, uint amount);
    event Unpledge(address indexed caller, uint amount);
    event Claim(uint indexed amount);
    event Repay(address indexed caller, uint amount);

    //----------------- FUNCTIONS ---------------
    constructor(address _token) {
        token = IERC20(_token);
        state = CampaignState.OPEN;
    }


    function launch(address _creator, uint32 _apy, uint _goal, uint256 _startAt, uint256 _endAt) onlyOwner external {
        
        console.log(2);
        if(_endAt < _startAt || 
        state != CampaignState.OPEN){
            revert Crowdlend__InvalidDate();
        }
        console.log(3);

        campaign = Campaign({
            creator: _creator,
            apy: _apy,
            goal: _goal,
            pledged: 0,
            startAt: _startAt,
            endAt: _endAt,
            claimed: false
        });

        console.log(4);
        transferOwnership(_creator);
        state = CampaignState.LAUNCHED;
        emit Launch(msg.sender, _apy,_goal,_startAt,_endAt);
    }

    // Investors can pledge until start time reached / goal reached
    function pledge(uint _amount) external {
        if (block.timestamp > campaign.startAt ||
            token.balanceOf(msg.sender) < _amount ||
            campaign.pledged + _amount > campaign.goal) {
            revert Crowdlend__ErrorPledging();
        }
        
        token.transferFrom(msg.sender, address(this), _amount);
        campaign.pledged += _amount;
        pledgedAmount[msg.sender] += _amount;
        totalPledgedAmount += _amount;

        emit Pledge(msg.sender, _amount);
    }
    // Creators repays pledged + APY 
    function repay(uint _amount) external {
        if(_amount < (campaign.pledged * campaign.apy)/100 + campaign.pledged){ // creators can not repay an amount smaller than the pledged + APY
            revert Crowdlend__ErrorRepaying();
        }
        token.transferFrom(msg.sender, address(this), _amount);

        emit Repay(msg.sender, _amount);
    } 
    // Creators can claim funds from startDate on
    function claimFunds() external onlyOwner{
        if (block.timestamp < campaign.startAt || // creators can not claim funds before the campaign starts
            campaign.pledged != campaign.goal || // creators can not claim funds if the goal is not reached
            campaign.claimed) { // creators can not claim funds if they have already claimed
            revert Crowdlend__ErrorClaiming();
        }
        campaign.claimed = true;
        uint value = campaign.pledged;
        campaign.pledged = 0;
        token.transfer(msg.sender, value);

        emit Claim(value);
    }

    // Users can unpledge without APY from startDAte
    function unPledge(uint _amount) external {
        if ((block.timestamp >= campaign.startAt && campaign.pledged == campaign.goal) || // users can not unpledge after the campaign starts and the goal is reached
            pledgedAmount[msg.sender] >= _amount) { // users can not unpledge more than they already have pledged
            revert Crowdlend__ErrorUnpledging();
        }
        
        token.transferFrom(address(this), msg.sender, _amount);
        campaign.pledged -= _amount;
        pledgedAmount[msg.sender] -= _amount;
        totalPledgedAmount -= _amount;

        emit Unpledge(msg.sender, _amount);
    }
    
    //  Users can claim the pledged amount + APY
    function claimPledged() external {
        if (block.timestamp <= campaign.endAt) { // users can not claim before the campaign ends
            revert Crowdlend__ErrorClaiming();
        }

        uint pa = pledgedAmount[msg.sender];
        pledgedAmount[msg.sender] = 0;
        uint totalFunds = pa + (campaign.apy * pa)/100;

        token.approve(address(this), totalFunds);
        token.transferFrom(address(this), msg.sender, totalFunds);
        
        campaign.pledged -= pa;

        emit Claim(pa);
    }
}