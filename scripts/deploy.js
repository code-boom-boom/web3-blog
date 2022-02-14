/** Script file for deploy */
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  /** These two lines deploy the contract to the network */
  const Blog = await hre.ethers.getContractFactory("Blog");
  const blog = await Blog.deploy("My blog");

  await blog.deployed();
  console.log("Blog deployed to:", blog.address);

  /** This code writes the contract addresses to a local file named config.js that we can use in the app */
  fs.writeFileSync("./config.js", `
    export const contractAddress = "${blog.address}"
    export const ownerAddress = "${blog.signer.address}"
  `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
