require("dotenv").config();

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
// require("hardhat-gas-reporter");
require("hardhat-abi-exporter");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  contractSizer: {
    alphaSort: true,
    runOnCompile: false,
    disambiguatePaths: true,
  },
  abiExporter: {
    path: "./data/abi",
    clear: true,
    // flat: true,
    only: [
      "SaulGoodmanAgreements",
    ]
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.ETHERSCANKEY,
      polygon: process.env.ETHERSCANKEY,
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    mumbai: {
      url: "https://speedy-nodes-nyc.moralis.io/"+ process.env.MORALIS_KEY+ "/polygon/mumbai",
      chainId: 80001,
      accounts: process.env.MUMBAI_KEY ? [process.env.MUMBAI_KEY] : undefined,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.11",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  }
};
