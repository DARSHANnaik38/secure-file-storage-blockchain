const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("👤 Deploying with address:", deployer.address);

  const FileStorage = await hre.ethers.getContractFactory("FileStorage");
  console.log("📦 Contract factory loaded.");

  const fileStorage = await FileStorage.deploy();
  console.log("⏳ Waiting for contract to be deployed...");

  await fileStorage.deployed();
  console.log("✅ Contract deployed to:", fileStorage.address);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
