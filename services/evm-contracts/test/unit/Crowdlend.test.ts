import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";

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
  const endAt = Math.floor(Date.now() / 1000) + 3600;

  before(async function () {
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
      .createCampaign(campaignOwner.address, mockERC20.address, GOAL, endAt)
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

    it("Campaign details should be set", async function () {
      const campaign: ICampaign = await crowdlend.campaign();
      expect(campaign.creator).to.equal(campaignOwner.address);
      expect(campaign.goal).to.equal("100000000000000000");
      expect(campaign.startAt).to.be.greaterThan(0);
      expect(campaign.endAt).to.equal(endAt);
    });

    it("Campaign owner should be the new owner", async function () {
      expect(await crowdlend.owner()).to.equal(campaignOwner.address);
    });

    it("Campaigns can only be launched once", async function () {
      await expect(
        crowdlend.connect(campaignOwner).launch(attacker.address, GOAL, endAt)
      ).to.be.reverted;
    });
  });

  describe("Campaign pledge", function () {
    before(async function () {
      await mockERC20.connect(DAO).transfer(campaignUser.address, 1000);

      await mockERC20
        .connect(campaignUser)
        .increaseAllowance(crowdlend.address, 1000);
    });
    
    it("User should be able to pledge", async function () {
      await expect(crowdlend.connect(campaignUser).pledge(500)).to.not.be
        .reverted;
    });
 
    it("User should be able to pledge", async function () {
      await expect(crowdlend.connect(campaignUser).pledgeNative({value:500})).to.not.be
        .reverted;
    });

    it("User should not be able to pledge if it does not have enough allowance", async function () {
      await expect(crowdlend.connect(campaignUser).pledge(2000)).to.be.reverted;
    });

    it("User should not be able to pledge if it campaign has ended", async function () {
      await time.increase(3600);
      await expect(crowdlend.connect(campaignUser).pledge(500)).to.be.reverted;
    });
  });
});
