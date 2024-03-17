import { task, types } from 'hardhat/config';
import ImageData from '../files/image-data-v2.json';
import { dataToDescriptorInput } from './utils';

task('populate-descriptor', 'Populates the descriptor with color palettes and Noun parts')
  .addOptionalParam(
    'nftDescriptor',
    'The `NFTDescriptorV2` contract address',
    '0x0B3Eb88A98BcC90Cc0441f78D5677f8a6572F1BE',
    types.string,
  )
  .addOptionalParam(
    'nounsDescriptor',
    'The `NounsDescriptorV2` contract address',
    '0xB1138b0487AE97dD3352e87C5BbF8350aF9a9941',
    types.string,
  )
  .setAction(async ({ nftDescriptor, nounsDescriptor }, { ethers, network }) => {
    const options = { gasLimit: network.name === 'hardhat' ? 30000000 : undefined };

    const descriptorFactory = await ethers.getContractFactory('NounsDescriptorV2', {
      libraries: {
        NFTDescriptorV2: nftDescriptor,
      },
    });
    const descriptorContract = descriptorFactory.attach(nounsDescriptor);

    console.log('ImageData', ImageData);
    const { bgcolors, palette, images } = ImageData;
    console.log('bgcolors', bgcolors);
    const { bodies, accessories, heads, glasses } = images;

    const bodiesPage = dataToDescriptorInput(bodies.map(({ data }) => data));
    console.log('bodiesPage', bodiesPage);

    const headsPage = dataToDescriptorInput(heads.map(({ data }) => data));
    const glassesPage = dataToDescriptorInput(glasses.map(({ data }) => data));
    const accessoriesPage = dataToDescriptorInput(accessories.map(({ data }) => data));

    console.log('descriptorContract', descriptorContract.address);
    console.log('chainId', (await ethers.provider.getNetwork()).chainId);
    console.log('owner', await descriptorContract.owner());
    // await descriptorContract.addManyBackgrounds(bgcolors);
    console.log('test');
    // await descriptorContract.setPalette(0, `0x000000${palette.join('')}`);
    console.log('test');
    // await descriptorContract.addBodies(
    //   bodiesPage.encodedCompressed,
    //   bodiesPage.originalLength,
    //   bodiesPage.itemCount,
    //   options,
    // );
    console.log('test');
    // await descriptorContract.addHeads(
    //   headsPage.encodedCompressed,
    //   headsPage.originalLength,
    //   headsPage.itemCount,
    //   options,
    // );
    console.log('test');
    // await descriptorContract.addGlasses(
    //   glassesPage.encodedCompressed,
    //   glassesPage.originalLength,
    //   glassesPage.itemCount,
    //   options,
    // );
    console.log('test');

    await descriptorContract.addAccessories(
      accessoriesPage.encodedCompressed,
      accessoriesPage.originalLength,
      accessoriesPage.itemCount,
      options,
    );

    console.log('Descriptor populated with palettes and parts.');
  });
