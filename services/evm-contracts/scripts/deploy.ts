import { ethers, network } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { CrowdlendFactory, MockToken } from "../typechain-types";
import { verify } from "../utils/verify";

async function main() {
  let crowdlendFactory: CrowdlendFactory;
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

  const CrowdlendFactoryFactory = await ethers.getContractFactory(
    "CrowdlendFactory"
  );
  crowdlendFactory = await CrowdlendFactoryFactory.connect(DAO).deploy();
  await crowdlendFactory.deployed();

  if (network.config.chainId !== 31337 && network.config.chainId !== 5001) {
    await verify(crowdlendFactory.address, []);
  }
  console.log(`MOCK deployed to ${mockERC20.address}`);
  console.log(`CrowdlendFactory deployed to ${crowdlendFactory.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
