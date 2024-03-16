import { ethers } from 'hardhat';

// Seeder contract deployed at 0x100BB3fAdc375e4B7eDc1d501ab8e131d1a7A72C
// Renderer contract deployed at 0xbbCd3972e8A9cc1e5D15aDB1f03f39E53b76D44c
// Inflator contract deployed at 0x178540c31b397ca7c57811b14DFC0982f6bcA092
// NFTDescriptorV2 deployed at 0x0B3Eb88A98BcC90Cc0441f78D5677f8a6572F1BE
// Descriptor contract deployed at 0xB1138b0487AE97dD3352e87C5BbF8350aF9a9941
// Art contract deployed at 0x266fC8249Bf484962E842C5fB1D4DB538177f1f8
// Token contract deployed at 0xA7355007cCaee83105cd840c59dcB18c8d0EbB28

async function main() {
  // CONFIGURE PROVIDER & WALLET
  // const signers = await ethers.getSigners();
  // const firstSignerAddress: string = signers[0].address;
  // const firstSignerAddress = ethers.utils.getAddress('0xD80C52d3dBeDE3941772AF7ADce2aAdDc00505AB');

  // SETUP NOUNS TOKEN CONTRACT
  const NounsToken = await ethers.getContractFactory('NounsToken');
  const nounsToken = await NounsToken.attach('0xA7355007cCaee83105cd840c59dcB18c8d0EbB28');

  // MINT NOUN (GOES TO CONTRACT OWNER)
  const mintTxResponse = await nounsToken.mint();
  console.log(mintTxResponse);
  const mintTxReceipt = await mintTxResponse.wait();
  console.log(mintTxReceipt);

  // NOUN CAUGHT (TRANSFER FROM CONTRACT OWNER TO RECIPIENT) function nounCaught(uint256 nounId, address _to) public onlyMinter
  // const nounsCaughtTxResponse = await nounsToken.nounCaught(
  //   0,
  //   '0x9b3cAd3C29Db36797cbd03a236b701f904a308f9',
  // );
  // const nounsCaughtTxReceipt = await nounsCaughtTxResponse.wait();
  // console.log(nounsCaughtTxReceipt);

  // GET NOUN SVG DATA
  // const tokenURI = await nounsToken.tokenURI(0);
  // console.log(tokenURI);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
