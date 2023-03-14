import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { CrowdfundFactory, Crowdfund, MockToken } from "../typechain-types";

async function main() {
  let crowdfundFactory: CrowdfundFactory;
  let mockERC20: MockToken;
  let DAO: SignerWithAddress;
  let campaignUser: SignerWithAddress;

  const signers: SignerWithAddress[] = await ethers.getSigners();
  DAO = signers[0];
  campaignUser = signers[1];

  const MockERC20Factory = await ethers.getContractFactory("MockToken");
  mockERC20 = await MockERC20Factory.connect(DAO).deploy("MOCK", "MCK");
  await mockERC20.deployed();
  await mockERC20.connect(DAO).transfer(campaignUser.address, 1000);

  const CrowdfundFactoryFactory = await ethers.getContractFactory(
    "CrowdfundFactory"
  );
  crowdfundFactory = await CrowdfundFactoryFactory.connect(DAO).deploy();
  await crowdfundFactory.deployed();

  console.log(`MOCK deployed to ${mockERC20.address}`);
  console.log(`CrowdfundFactory deployed to ${crowdfundFactory.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
