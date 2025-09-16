// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const Registry = await ethers.getContractFactory("TouristRegistry");
  const registry = await Registry.deploy();

  await registry.waitForDeployment(); // hardhat v3+
  console.log("TouristRegistry deployed to:", registry.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


