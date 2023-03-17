import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { time, mine } from "@nomicfoundation/hardhat-network-helpers";

import { BigNumber } from "ethers";


import { CrowdlendFactory, Crowdlend, MockToken } from "../../typechain-types";
import { ICampaign } from "../../scripts/schemas";

describe("Single Crowdlend contract", function () {
  let crowdlendFactory: CrowdlendFactory;
  let crowdlend: Crowdlend;
  let mockERC20: MockToken;
  let DAO: SignerWithAddress;
  let campaignOwner: SignerWithAddress;
  let campaignUser: SignerWithAddress;
  let attacker: SignerWithAddress;

  const GOAL = "100000000000000000";
  const startAt = Math.floor(Date.now() / 1000);
  // const startAt2 = Math.floor(Date.now() / 1000) + 3600;
  const endAt = Math.floor(Date.now() / 1000) + 10800;
  const apy = 5;

  beforeEach(async function () {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    DAO = signers[0];
    campaignOwner = signers[1];
    campaignUser = signers[2];
    attacker = signers[3];

    const MockERC20Factory = await ethers.getContractFactory("MockToken");
    mockERC20 = await MockERC20Factory.connect(DAO).deploy("MOCK", "MCK");

    const crowdlendFactoryFactory = await ethers.getContractFactory(
      "CrowdlendFactory"
    );
    crowdlendFactory = await crowdlendFactoryFactory.connect(DAO).deploy();

    // create campaign
    let campaignAddress: string = "";
    await crowdlendFactory
      .connect(DAO)
      .createCampaign(campaignOwner.address, apy, mockERC20.address, GOAL, startAt, endAt)
      .then((tx) => tx.wait())
      .then((receipt) => {
        campaignAddress = receipt.logs[0].address;
      })
      .catch((error) => {
        console.error("Error creating campaign:", error);
      });
    const CrowdlendFactory = await ethers.getContractFactory("Crowdlend");
    crowdlend = CrowdlendFactory.attach(campaignAddress);
  });

  describe("constructor", function () {
    it("ERC20 Token should be set", async function () {
      expect(await crowdlend.token()).to.equal(mockERC20.address);
    });
  });

  describe("Campaign launch", function () {
    it("Crowdlend state is set to LAUNCHED", async function () {
      expect(await crowdlend.state()).to.equal(1);
    });
    
    it("Campaign can't be created when startDate > endDate",  function (){
      expect(  crowdlendFactory
        .connect(DAO)
        .createCampaign(campaignOwner.address, apy,mockERC20.address, GOAL, endAt, startAt)).to.be.reverted;
    })

    it("Campaign details should be set", async function () {
      const campaign: ICampaign = await crowdlend.campaign();
      expect(campaign.creator).to.equal(campaignOwner.address);
      expect(campaign.apy).to.equal(apy);
      expect(campaign.goal).to.equal("100000000000000000");
      expect(campaign.startAt).to.equal(startAt);
      expect(campaign.endAt).to.equal(endAt);
    });

    it("Campaign owner should be the new owner", async function () {
      expect(await crowdlend.owner()).to.equal(campaignOwner.address);
    });

    it("Campaigns can only be launched once", async function () {
      await expect(
        crowdlend.connect(campaignOwner).launch(attacker.address, apy, GOAL, startAt, endAt)
      ).to.be.reverted;
    });
  });

  describe("Campaign pledge", function () {
    beforeEach(async function () {
      await mockERC20.connect(DAO).transfer(campaignUser.address, 1000);

      await mockERC20
        .connect(campaignUser)
        .increaseAllowance(crowdlend.address, 1000);
    });
    
    it("User should be able to pledge", async function () {
      await expect(crowdlend.connect(campaignUser).pledge(500)).to.not.be
        .reverted;
    });

    it("User should not be able to pledge if it does not have enough allowance", async function () {
      await expect(crowdlend.connect(campaignUser).pledge(2000)).to.be.reverted;
    });

    it("User should not be able to pledge if it campaign has ended", async function () {
      await time.increase(3600);
      expect(crowdlend.connect(campaignUser).pledge(500)).to.be.reverted;
    });
  });

  describe("Campaign claim", function () {
    beforeEach(async function () {
      await mockERC20.connect(DAO).transfer(campaignUser.address, 1000);
      
      await mockERC20
        .connect(campaignUser)
        .increaseAllowance(crowdlend.address, 1000);
    });
    
    it("User should be able to pledge", async function () {
      // console.log(await mockERC20.balanceOf(campaignUser.address))
      expect(crowdlend.connect(campaignUser).pledge(500)).to.not.be
        .reverted;
    });

    it("User should not be able to pledge if it does not have enough allowance", async function () {
      await expect(crowdlend.connect(campaignUser).pledge(2000)).to.be.reverted;
    });

    it("User should not be able to pledge if it campaign has ended", async function () {
      await time.increase(3600);
      expect(crowdlend.connect(campaignUser).pledge(500)).to.be.reverted;
    });

    it("Creator should be able to claim funds", async function () {
      const balance = await mockERC20.balanceOf(campaignOwner.address);
      await crowdlend.connect(campaignUser).pledge(500);
      await crowdlend.connect(campaignOwner).claimFunds();
      expect((await mockERC20.balanceOf(campaignOwner.address))).to.be.equal(balance.add(500))
    });

    it("Investor should be able to claim funds", async function () {
      // const balance = await mockERC20.balanceOf(campaignUser.address);
      // const allowance = await mockERC20.allowance(campaignOwner.address,crowdlend.address)
      // await console.log(balance, allowance)
      await crowdlend.connect(campaignUser).pledge(500);
      await time.increase(3600)
      await console.log(await mockERC20.balanceOf(campaignUser.address))
      await crowdlend.connect(campaignUser).claimPledged();
      await console.log(await mockERC20.balanceOf(campaignUser.address))

      // console.log(await mockERC20.balanceOf(campaignUser.address))
      // expect((await mockERC20.balanceOf(campaignUser.address))).to.be.equal(balance.add(500))
    });
  });
});
