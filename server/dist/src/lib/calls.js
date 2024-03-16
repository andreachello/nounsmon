// import ethers from "ethers"
// const NounsTokenABI = [
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_noundersDAO",
//                 "type": "address"
//             },
//             {
//                 "internalType": "address",
//                 "name": "_minter",
//                 "type": "address"
//             },
//             {
//                 "internalType": "contract INounsDescriptor",
//                 "name": "_descriptor",
//                 "type": "address"
//             },
//             {
//                 "internalType": "contract INounsSeeder",
//                 "name": "_seeder",
//                 "type": "address"
//             },
//             {
//                 "internalType": "contract IProxyRegistry",
//                 "name": "_proxyRegistry",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "constructor"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "owner",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "approved",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "Approval",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "owner",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "operator",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "bool",
//                 "name": "approved",
//                 "type": "bool"
//             }
//         ],
//         "name": "ApprovalForAll",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "delegator",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "fromDelegate",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "toDelegate",
//                 "type": "address"
//             }
//         ],
//         "name": "DelegateChanged",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "delegate",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "previousBalance",
//                 "type": "uint256"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "newBalance",
//                 "type": "uint256"
//             }
//         ],
//         "name": "DelegateVotesChanged",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [],
//         "name": "DescriptorLocked",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": false,
//                 "internalType": "contract INounsDescriptor",
//                 "name": "descriptor",
//                 "type": "address"
//             }
//         ],
//         "name": "DescriptorUpdated",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [],
//         "name": "MinterLocked",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": false,
//                 "internalType": "address",
//                 "name": "minter",
//                 "type": "address"
//             }
//         ],
//         "name": "MinterUpdated",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "NounBurned",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             },
//             {
//                 "components": [
//                     {
//                         "internalType": "uint48",
//                         "name": "background",
//                         "type": "uint48"
//                     },
//                     {
//                         "internalType": "uint48",
//                         "name": "body",
//                         "type": "uint48"
//                     },
//                     {
//                         "internalType": "uint48",
//                         "name": "accessory",
//                         "type": "uint48"
//                     },
//                     {
//                         "internalType": "uint48",
//                         "name": "head",
//                         "type": "uint48"
//                     },
//                     {
//                         "internalType": "uint48",
//                         "name": "glasses",
//                         "type": "uint48"
//                     }
//                 ],
//                 "indexed": false,
//                 "internalType": "struct INounsSeeder.Seed",
//                 "name": "seed",
//                 "type": "tuple"
//             }
//         ],
//         "name": "NounCreated",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": false,
//                 "internalType": "address",
//                 "name": "noundersDAO",
//                 "type": "address"
//             }
//         ],
//         "name": "NoundersDAOUpdated",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "previousOwner",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "newOwner",
//                 "type": "address"
//             }
//         ],
//         "name": "OwnershipTransferred",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [],
//         "name": "SeederLocked",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": false,
//                 "internalType": "contract INounsSeeder",
//                 "name": "seeder",
//                 "type": "address"
//             }
//         ],
//         "name": "SeederUpdated",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "from",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "to",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "Transfer",
//         "type": "event"
//     },
//     {
//         "inputs": [],
//         "name": "DELEGATION_TYPEHASH",
//         "outputs": [
//             {
//                 "internalType": "bytes32",
//                 "name": "",
//                 "type": "bytes32"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "DOMAIN_TYPEHASH",
//         "outputs": [
//             {
//                 "internalType": "bytes32",
//                 "name": "",
//                 "type": "bytes32"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "to",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "approve",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "owner",
//                 "type": "address"
//             }
//         ],
//         "name": "balanceOf",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "nounId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "burn",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint32",
//                 "name": "",
//                 "type": "uint32"
//             }
//         ],
//         "name": "checkpoints",
//         "outputs": [
//             {
//                 "internalType": "uint32",
//                 "name": "fromBlock",
//                 "type": "uint32"
//             },
//             {
//                 "internalType": "uint96",
//                 "name": "votes",
//                 "type": "uint96"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "contractURI",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "dataURI",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "decimals",
//         "outputs": [
//             {
//                 "internalType": "uint8",
//                 "name": "",
//                 "type": "uint8"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "delegatee",
//                 "type": "address"
//             }
//         ],
//         "name": "delegate",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "delegatee",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "nonce",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "expiry",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint8",
//                 "name": "v",
//                 "type": "uint8"
//             },
//             {
//                 "internalType": "bytes32",
//                 "name": "r",
//                 "type": "bytes32"
//             },
//             {
//                 "internalType": "bytes32",
//                 "name": "s",
//                 "type": "bytes32"
//             }
//         ],
//         "name": "delegateBySig",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "delegator",
//                 "type": "address"
//             }
//         ],
//         "name": "delegates",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "descriptor",
//         "outputs": [
//             {
//                 "internalType": "contract INounsDescriptor",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "getApproved",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             }
//         ],
//         "name": "getCurrentVotes",
//         "outputs": [
//             {
//                 "internalType": "uint96",
//                 "name": "",
//                 "type": "uint96"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "blockNumber",
//                 "type": "uint256"
//             }
//         ],
//         "name": "getPriorVotes",
//         "outputs": [
//             {
//                 "internalType": "uint96",
//                 "name": "",
//                 "type": "uint96"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "owner",
//                 "type": "address"
//             },
//             {
//                 "internalType": "address",
//                 "name": "operator",
//                 "type": "address"
//             }
//         ],
//         "name": "isApprovedForAll",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "isDescriptorLocked",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "isMinterLocked",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "isSeederLocked",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "lockDescriptor",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "lockMinter",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "lockSeeder",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "mint",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "minter",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "name",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "name": "nonces",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "noundersDAO",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "name": "numCheckpoints",
//         "outputs": [
//             {
//                 "internalType": "uint32",
//                 "name": "",
//                 "type": "uint32"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "owner",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "ownerOf",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "proxyRegistry",
//         "outputs": [
//             {
//                 "internalType": "contract IProxyRegistry",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "renounceOwnership",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "from",
//                 "type": "address"
//             },
//             {
//                 "internalType": "address",
//                 "name": "to",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "safeTransferFrom",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "from",
//                 "type": "address"
//             },
//             {
//                 "internalType": "address",
//                 "name": "to",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "bytes",
//                 "name": "_data",
//                 "type": "bytes"
//             }
//         ],
//         "name": "safeTransferFrom",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "seeder",
//         "outputs": [
//             {
//                 "internalType": "contract INounsSeeder",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "name": "seeds",
//         "outputs": [
//             {
//                 "internalType": "uint48",
//                 "name": "background",
//                 "type": "uint48"
//             },
//             {
//                 "internalType": "uint48",
//                 "name": "body",
//                 "type": "uint48"
//             },
//             {
//                 "internalType": "uint48",
//                 "name": "accessory",
//                 "type": "uint48"
//             },
//             {
//                 "internalType": "uint48",
//                 "name": "head",
//                 "type": "uint48"
//             },
//             {
//                 "internalType": "uint48",
//                 "name": "glasses",
//                 "type": "uint48"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "operator",
//                 "type": "address"
//             },
//             {
//                 "internalType": "bool",
//                 "name": "approved",
//                 "type": "bool"
//             }
//         ],
//         "name": "setApprovalForAll",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "string",
//                 "name": "newContractURIHash",
//                 "type": "string"
//             }
//         ],
//         "name": "setContractURIHash",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "contract INounsDescriptor",
//                 "name": "_descriptor",
//                 "type": "address"
//             }
//         ],
//         "name": "setDescriptor",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_minter",
//                 "type": "address"
//             }
//         ],
//         "name": "setMinter",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_noundersDAO",
//                 "type": "address"
//             }
//         ],
//         "name": "setNoundersDAO",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "contract INounsSeeder",
//                 "name": "_seeder",
//                 "type": "address"
//             }
//         ],
//         "name": "setSeeder",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "bytes4",
//                 "name": "interfaceId",
//                 "type": "bytes4"
//             }
//         ],
//         "name": "supportsInterface",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "symbol",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "index",
//                 "type": "uint256"
//             }
//         ],
//         "name": "tokenByIndex",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "owner",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "index",
//                 "type": "uint256"
//             }
//         ],
//         "name": "tokenOfOwnerByIndex",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "tokenURI",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "totalSupply",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "from",
//                 "type": "address"
//             },
//             {
//                 "internalType": "address",
//                 "name": "to",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "tokenId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "transferFrom",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "newOwner",
//                 "type": "address"
//             }
//         ],
//         "name": "transferOwnership",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "delegator",
//                 "type": "address"
//             }
//         ],
//         "name": "votesToDelegate",
//         "outputs": [
//             {
//                 "internalType": "uint96",
//                 "name": "",
//                 "type": "uint96"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     }
// ]
// // Seeder contract deployed at 0x100BB3fAdc375e4B7eDc1d501ab8e131d1a7A72C
// // Renderer contract deployed at 0xbbCd3972e8A9cc1e5D15aDB1f03f39E53b76D44c
// // Inflator contract deployed at 0x178540c31b397ca7c57811b14DFC0982f6bcA092
// // NFTDescriptorV2 deployed at 0x0B3Eb88A98BcC90Cc0441f78D5677f8a6572F1BE
// // Descriptor contract deployed at 0xB1138b0487AE97dD3352e87C5BbF8350aF9a9941
// // Art contract deployed at 0x266fC8249Bf484962E842C5fB1D4DB538177f1f8
// // Token contract deployed at 0xA7355007cCaee83105cd840c59dcB18c8d0EbB28
// const API_KEY = "PPtJQff9hWwYVUIMUaF_fleKO5rQByuA"
// async function main() {
//     // CONFIGURE PROVIDER & WALLET
//     // const signers = await ethers.getSigners();
//     // const firstSignerAddress: string = signers[0].address;
//     // const firstSignerAddress = ethers.utils.getAddress('0xD80C52d3dBeDE3941772AF7ADce2aAdDc00505AB');
//     const provider = new ethers.AlchemyProvider(null, API_KEY);
//     // SETUP NOUNS TOKEN CONTRACT
//     var signer = await provider.getSigner()
//     // const NounsToken = await ethers.getContractFactory('NounsToken');
//     // const nounsToken = await NounsToken.attach('0xA7355007cCaee83105cd840c59dcB18c8d0EbB28');
//     const tokenContract = new ethers.Contract(
//         '0xA7355007cCaee83105cd840c59dcB18c8d0EbB28',
//         NounsTokenABI,
//         signer
//     );
//     console.log("TOKEN CONTRACT", tokenContract);
//     const txSigner = tokenContract.connect(signer);
//     // MINT NOUN (GOES TO CONTRACT OWNER)
//     // const mintTxResponse = await nounsToken.mint();
//     // console.log(mintTxResponse);
//     // const mintTxReceipt = await mintTxResponse.wait();
//     // console.log(mintTxReceipt);
//     // NOUN CAUGHT (TRANSFER FROM CONTRACT OWNER TO RECIPIENT) function nounCaught(uint256 nounId, address _to) public onlyMinter
//     // const nounsCaughtTxResponse = await nounsToken.nounCaught(
//     //   0,
//     //   '0x9b3cAd3C29Db36797cbd03a236b701f904a308f9',
//     // );
//     // const nounsCaughtTxReceipt = await nounsCaughtTxResponse.wait();
//     // console.log(nounsCaughtTxReceipt);
//     // GET NOUN SVG DATA
//     // const tokenURI = await nounsToken.tokenURI(0);
//     // console.log(tokenURI);
// }
// main()
//# sourceMappingURL=calls.js.map