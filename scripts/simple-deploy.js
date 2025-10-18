const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting HealthMonitoring contract deployment...");
  
  // Get the contract factory
  const HealthMonitoring = await ethers.getContractFactory("HealthMonitoring");
  
  console.log("📋 Deploying HealthMonitoring contract...");
  
  // Deploy the contract
  const healthMonitoring = await HealthMonitoring.deploy();
  
  // Wait for deployment to complete
  await healthMonitoring.waitForDeployment();
  
  const contractAddress = await healthMonitoring.getAddress();
  
  console.log("✅ HealthMonitoring contract deployed successfully!");
  console.log("📍 Contract Address:", contractAddress);
  console.log("🔗 Network:", network.name);
  console.log("⛽ Gas Used:", (await healthMonitoring.deploymentTransaction().wait()).gasUsed.toString());
  
  // Register a test patient
  console.log("\n👤 Registering test patient...");
  const tx = await healthMonitoring.registerPatient(
    "Anurag Tummapudi",
    28,
    "male",
    ["Hypertension"],
    "gaddantisaisaran@gmail.com"
  );
  
  await tx.wait();
  console.log("✅ Test patient registered successfully!");
  
  // Get contract info
  const totalPatients = await healthMonitoring.getTotalPatients();
  
  console.log("\n📈 Contract Statistics:");
  console.log("👥 Total Patients:", totalPatients.toString());
  
  console.log("\n🎉 Deployment completed successfully!");
  console.log("=".repeat(60));
  console.log("🏥 HEALTH MONITORING CONTRACT DEPLOYED");
  console.log("=".repeat(60));
  console.log("📍 Contract Address:", contractAddress);
  console.log("🌐 Network:", network.name);
  console.log("🔗 Explorer:", getExplorerUrl(network.name, contractAddress));
  console.log("=".repeat(60));
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    network: network.name,
    chainId: network.config.chainId,
    deployer: (await ethers.getSigners())[0].address,
    timestamp: new Date().toISOString(),
    gasUsed: (await healthMonitoring.deploymentTransaction().wait()).gasUsed.toString(),
    totalPatients: totalPatients.toString()
  };
  
  const fs = require('fs');
  fs.writeFileSync(
    'deployment-info.json', 
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("💾 Deployment info saved to deployment-info.json");
}

function getExplorerUrl(networkName, contractAddress) {
  const explorers = {
    sepolia: `https://sepolia.etherscan.io/address/${contractAddress}`,
    polygon: `https://polygonscan.com/address/${contractAddress}`,
    bsc: `https://bscscan.com/address/${contractAddress}`,
    mumbai: `https://mumbai.polygonscan.com/address/${contractAddress}`,
    hardhat: `Local network - no explorer available`
  };
  
  return explorers[networkName] || `Unknown network: ${networkName}`;
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
