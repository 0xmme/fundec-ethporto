import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import path from "path";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    local: {
      url: "http://127.0.0.1:8545/",
      chainId: 1337,
    },
  },
  paths: {
    artifacts: path.join(__dirname, "artifacts"),
  },
};

export default config;
