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
  
  // Record some test vitals
  console.log("\n📊 Recording test vitals data...");
  const vitalsTx = await healthMonitoring.recordVitals(1, {
    timestamp: Math.floor(Date.now() / 1000),
    heartRate: 85,
    systolicBP: 125,
    diastolicBP: 82,
    oxygenSaturation: 98,
    temperature: 368, // 36.8°C in tenths
    steps: 8500,
    calories: 2100,
    sleepHours: 7.5 * 10, // 7.5 hours in tenths
    stressLevel: 2,
    deviceType: "Apple Watch"
  });
  
  await vitalsTx.wait();
  console.log("✅ Test vitals recorded successfully!");
  
  // Record AI analysis
  console.log("\n🧠 Recording AI analysis...");
  const analysisTx = await healthMonitoring.recordHealthAnalysis(
    1,
    "low",
    [
      "Heart rate trending within normal range",
      "Blood pressure shows slight elevation",
      "Overall cardiovascular health is good"
    ],
    [
      "Continue regular exercise routine",
      "Monitor blood pressure daily",
      "Maintain current medication schedule"
    ],
    [
      "Overall cardiovascular health appears stable",
      "Regular monitoring recommended due to hypertension history"
    ],
    true,
    "resend-analysis-123",
    5
  );
  
  await analysisTx.wait();
  console.log("✅ AI analysis recorded successfully!");
  
  // Get contract info
  const totalPatients = await healthMonitoring.getTotalPatients();
  const totalVitals = await healthMonitoring.getTotalVitals();
  const totalAnalyses = await healthMonitoring.getTotalAnalyses();
  const totalAlerts = await healthMonitoring.getTotalAlerts();
  
  console.log("\n📈 Contract Statistics:");
  console.log("👥 Total Patients:", totalPatients.toString());
  console.log("📊 Total Vitals Records:", totalVitals.toString());
  console.log("🧠 Total AI Analyses:", totalAnalyses.toString());
  console.log("🚨 Total Health Alerts:", totalAlerts.toString());
  
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
    totalPatients: totalPatients.toString(),
    totalVitals: totalVitals.toString(),
    totalAnalyses: totalAnalyses.toString(),
    totalAlerts: totalAlerts.toString()
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
