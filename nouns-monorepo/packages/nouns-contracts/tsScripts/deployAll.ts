import { ethers } from 'hardhat';

async function main() {
  // CONFIGURE PROVIDER & WALLET
  const signers = await ethers.getSigners();
  const firstSignerAddress: string = signers[0].address;

  // // DEPLOY NOUNSSEEDER, GET CONTRACT ADDRESS & BLOCK NUMBER
  // const myNounsSeeder__factory = await ethers.getContractFactory('NounsSeeder');
  // const mySeederContract = await myNounsSeeder__factory.deploy();
  // await mySeederContract.deployed();
  // const mySeederAddress = mySeederContract.address;
  // // const blockNumber = await wallet.getBlockNumber();
  // console.log(`Seeder contract deployed at ${mySeederAddress}`);

  // // DEPLOY SVGRENDERER, GET CONTRACT ADDRESS
  // const mySVGRenderer__factory = await ethers.getContractFactory('SVGRenderer');
  // const myRendererContract = await mySVGRenderer__factory.deploy();
  // await myRendererContract.deployed();
  // const myRendererAddress = myRendererContract.address;
  // console.log(`Renderer contract deployed at ${myRendererAddress}`);

  // // DEPLOY INFLATOR, GET CONTRACT ADDRESS
  // const myInflator__factory = await ethers.getContractFactory('Inflator');
  // const myInflatorContract = await myInflator__factory.deploy();
  // await myInflatorContract.deployed();
  // const myInflatorAddress = myInflatorContract.address;
  // console.log(`Inflator contract deployed at ${myInflatorAddress}`);

  // // Deploy the NFTDESCRIPTORV2 library contract
  // const NFTDescriptorV2Factory = await ethers.getContractFactory('NFTDescriptorV2');
  // const nftDescriptorV2 = await NFTDescriptorV2Factory.deploy();
  // await nftDescriptorV2.deployed();
  // console.log(`NFTDescriptorV2 deployed at ${nftDescriptorV2.address}`);

  // // DEPLOY NOUNSDESCRIPTORV2, GET CONTRACT ADDRESS
  // const myNounsDescriptorV2__factory = await ethers.getContractFactory('NounsDescriptorV2', {
  //   libraries: {
  //     NFTDescriptorV2: nftDescriptorV2.address,
  //   },
  // });
  // const myDescriptorContract = await myNounsDescriptorV2__factory.deploy(
  //   '0x0000000000000000000000000000000000000000',
  //   myRendererAddress,
  // );
  // await myDescriptorContract.deployed();
  // const myDescriptorAddress = myDescriptorContract.address;
  // console.log(`Descriptor contract deployed at ${myDescriptorAddress}`);

  // // DEPLOY NOUNSART, GET CONTRACT ADDRESS
  // const myNounsArt__factory = await ethers.getContractFactory('NounsArt');
  // const myArtContract = await myNounsArt__factory.deploy(myDescriptorAddress, myInflatorAddress);
  // await myArtContract.deployed();
  // const myArtAddress = myArtContract.address;
  // console.log(`Art contract deployed at ${myArtAddress}`);

  // await myDescriptorContract.setArt(myArtAddress);

  // DEPLOY NOUNSTOKEN, GET CONTRACT ADDRESS
  const myNounsToken__factory = await ethers.getContractFactory('NounsToken');
  // myTokenContract's constructor takes args:  address _noundersDAO, address _minter, INounsDescriptorMinimal _descriptor, INounsSeeder _seeder, IProxyRegistry _proxyRegistry
  const myTokenContract = await myNounsToken__factory.deploy(
    firstSignerAddress,
    '0xB1138b0487AE97dD3352e87C5BbF8350aF9a9941',
    '0x100BB3fAdc375e4B7eDc1d501ab8e131d1a7A72C',
  );
  await myTokenContract.deployed();
  const myTokenAddress = myTokenContract.address;
  console.log(`Token contract deployed at ${myTokenAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
