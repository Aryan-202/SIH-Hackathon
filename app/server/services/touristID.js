const { ethers } = require("ethers");
const registryAbi = require("../../../artifacts/contracts/TouristRegistry.sol/TouristRegistry.json").abi;

// Replace this with the deployed address from deploy.js
const registryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const registryContract = new ethers.Contract(registryAddress, registryAbi, provider);

async function addTourist(name) {
    const signer = provider.getSigner();
    const contractWithSigner = registryContract.connect(await signer);
    const tx = await contractWithSigner.addTourist(name);
    await tx.wait();
    console.log(name, "added!");
}

async function getTouristHashID(name) {
    const hashID = await registryContract.getHashID(name);
    return hashID;
}

module.exports = { addTourist, getTouristHashID };
