import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { CrowdlendFactory, MockToken } from "../../typechain-types";

describe("CrowdlendFactory contract", function () {
  let crowdlendFactory: CrowdlendFactory;
  let mockERC20: MockToken;
  let DAO: SignerWithAddress;
  let campaignOwner: SignerWithAddress;

  before(async function () {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    DAO = signers[0];
    campaignOwner = signers[1];

    const MockERC20Factory = await ethers.getContractFactory("MockToken");
    mockERC20 = await MockERC20Factory.connect(DAO).deploy("MOCK", "MCK");

    const crowdlendFactoryFactory = await ethers.getContractFactory(
      "CrowdlendFactory"
    );
    crowdlendFactory = await crowdlendFactoryFactory.connect(DAO).deploy();
  });

  describe("constructor", function () {
    it("Number of campaings should be 0", async function () {
      expect((await crowdlendFactory.getAllCampaigns()).length).to.equal(0);
    });
  });

  describe("Create campaign", function () {
    const GOAL = "100000000000000000";
    const startAt = Math.floor(Date.now() / 1000);
    const endAt = Math.floor(Date.now() / 1000) + 7200;
    const apy = 5;
    it("Campaign owner should be able to create campaign", async function () {
      await expect(
        crowdlendFactory
          .connect(DAO)
          .createCampaign(campaignOwner.address,apy, mockERC20.address, GOAL, startAt, endAt)
      ).to.be.not.reverted;
    });

    it("Number of campaings should be 1", async function () {
      const allCampaigns = await crowdlendFactory
        .connect(campaignOwner)
        .getAllCampaigns();

      expect(allCampaigns.length).to.equal(1);
    });
  });
});
