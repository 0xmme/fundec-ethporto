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
        uint goal,
        uint256 startAt,
        uint256 endAt
    );
    event Cancel();
    event Pledge(address indexed caller, uint amount);
    event Unpledge(uint indexed id, address indexed caller, uint amount);
    event Claim(uint id);
    event Refund(uint id, address indexed caller, uint amount);

    //----------------- FUNCTIONS ---------------
    constructor(address _token) {
        token = IERC20(_token);
        state = CampaignState.OPEN;
    }


    function launch(address _creator, uint _goal, uint256 _endAt) onlyOwner external {
        uint256 _startAt = block.timestamp;
        require(_endAt > _startAt, "End time is less than Start time");
        require(state == CampaignState.OPEN, "Campaign has already been launched");

        campaign = Campaign({
            creator: _creator,
            goal: _goal,
            pledged: 0,
            startAt: _startAt,
            endAt: _endAt,
            claimed: false
        });

        transferOwnership(_creator);
        state = CampaignState.LAUNCHED;
        emit Launch(msg.sender,_goal,_startAt,_endAt);
    }


    function pledge(uint _amount) external {
        if (block.timestamp < campaign.startAt || 
            block.timestamp > campaign.endAt || 
            token.balanceOf(msg.sender) < _amount) {
            revert Crowdlend__ErrorPledging();
        }
        
        token.transferFrom(msg.sender, address(this), _amount);
        campaign.pledged += _amount;
        pledgedAmount[msg.sender] += _amount;

        emit Pledge(msg.sender, _amount);
    }

    function pledgeNative() external payable {
        if (block.timestamp < campaign.startAt || 
            block.timestamp > campaign.endAt || 
            msg.value == 0) {
            revert Crowdlend__ErrorPledging();
        }
        
        campaign.pledged += msg.value;
        pledgedAmount[msg.sender] += msg.value;

        emit Pledge(msg.sender, msg.value);
    }

    function unPledge(uint _id,uint _amount) external {
        if (block.timestamp >= campaign.startAt || 
            block.timestamp <= campaign.endAt || 
            pledgedAmount[msg.sender] >= _amount) {
            revert Crowdlend__ErrorUnpledging();
        }

        token.transferFrom(address(this), msg.sender, _amount);
        campaign.pledged -= _amount;
        pledgedAmount[msg.sender] -= _amount;

        emit Unpledge(_id, msg.sender, _amount);
    }
}
