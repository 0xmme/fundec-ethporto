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


contract Crowdlend is Ownable {
    /**
     * @dev This contract is designed to handle the logic for managing a 
     * single crowdlending campaign.
    */

    //----------------- STORAGE -----------------
    IERC20 public immutable token;
    Campaign public campaign;
    mapping(address => uint) public pledgedAmount;
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
    event Refund(address indexed caller, uint amount);

    //----------------- FUNCTIONS ---------------
    constructor(address _token) {
        token = IERC20(_token);
        state = CampaignState.OPEN;
    }


    function launch(address _creator, uint32 _apy, uint _goal, uint256 _startAt, uint256 _endAt) onlyOwner external {
      
        if(_endAt < _startAt || 
        state != CampaignState.OPEN){
            revert Crowdlend__InvalidDate();
        }

        campaign = Campaign({
            creator: _creator,
            apy: _apy,
            goal: _goal,
            pledged: 0,
            startAt: _startAt,
            endAt: _endAt,
            claimed: false
        });

        transferOwnership(_creator);
        state = CampaignState.LAUNCHED;
        emit Launch(msg.sender, _apy,_goal,_startAt,_endAt);
    }

    function pledge(uint _amount) external {
        if (block.timestamp < campaign.startAt || 
            block.timestamp > campaign.endAt || 
            token.balanceOf(msg.sender) < _amount ||
            campaign.pledged + _amount > campaign.goal) {
            revert Crowdlend__ErrorPledging();
        }
        
        token.transferFrom(msg.sender, address(this), _amount);
        campaign.pledged += _amount;
        pledgedAmount[msg.sender] += _amount;

        emit Pledge(msg.sender, _amount);
    }

    function repay(uint _amount) external {
        if(block.timestamp < campaign.endAt ||
            _amount < (campaign.pledged * campaign.apy)/100 + campaign.pledged){
            revert Crowdlend__ErrorClaiming();
        }

        token.approve(address(this), _amount);
        token.transferFrom(msg.sender, address(this), _amount);
        

    } 

    function claimFunds() external onlyOwner{
        if (block.timestamp < campaign.startAt || 
            block.timestamp > campaign.endAt || campaign.claimed) {
            revert Crowdlend__ErrorPledging();
        }
        campaign.claimed = true;
        token.transfer(msg.sender, campaign.pledged);

        emit Claim(campaign.pledged);
    }

    function unPledge(uint _amount) external {
        if (block.timestamp >= campaign.startAt || 
            block.timestamp <= campaign.endAt || 
            pledgedAmount[msg.sender] >= _amount) {
            revert Crowdlend__ErrorUnpledging();
        }
        
        token.transferFrom(address(this), msg.sender, _amount);
        campaign.pledged -= _amount;
        pledgedAmount[msg.sender] -= _amount;

        emit Unpledge(msg.sender, _amount);
    }

    function claimPledged() external {
        if (block.timestamp <= campaign.endAt) {
            revert Crowdlend__ErrorClaiming();
        }

    uint pa = pledgedAmount[msg.sender];
    pledgedAmount[msg.sender] = 0;
    uint totalFunds = pa + (campaign.apy * pa)/100;

    token.approve(address(this), totalFunds);
    token.transferFrom(address(this), msg.sender, totalFunds);
    
    campaign.pledged -= totalFunds;

    emit Claim(pa);
    }
}