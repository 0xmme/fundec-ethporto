import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { CrowdfundFactory, MockToken } from "../../typechain-types";

describe("CrowdfundFactory contract", function () {
  let crowdfundFactory: CrowdfundFactory;
  let mockERC20: MockToken;
  let DAO: SignerWithAddress;
  let campaignOwner: SignerWithAddress;

  before(async function () {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    DAO = signers[0];
    campaignOwner = signers[1];

    const MockERC20Factory = await ethers.getContractFactory("MockToken");
    mockERC20 = await MockERC20Factory.connect(DAO).deploy("MOCK", "MCK");

    const CrowdfundFactoryFactory = await ethers.getContractFactory(
      "CrowdfundFactory"
    );
    crowdfundFactory = await CrowdfundFactoryFactory.connect(DAO).deploy();
  });

  describe("constructor", function () {
    it("Number of campaings should be 0", async function () {
      expect((await crowdfundFactory.getAllCampaigns()).length).to.equal(0);
    });
  });

  describe("Create campaign", function () {
    const GOAL = "100000000000000000";
    const endAt = Math.floor(Date.now() / 1000) + 7200;
    it("Campaign owner should be able to create campaign", async function () {
      await expect(
        crowdfundFactory
          .connect(campaignOwner)
          .createCampaign(mockERC20.address, GOAL, endAt)
      ).to.be.not.reverted;
    });

    it("Number of campaings should be 1", async function () {
      const allCampaigns = await crowdfundFactory
        .connect(campaignOwner)
        .getAllCampaigns();

      expect(allCampaigns.length).to.equal(1);
    });
  });
});
