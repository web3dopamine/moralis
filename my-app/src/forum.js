Moralis.Cloud.define("sign", async function (request) {

    const web3 = Moralis.web3ByChain("0x13881");
  
      let contractAbi = [
  
    {
  
      "anonymous": false,
  
      "inputs": [
  
        {
  
          "indexed": true,
  
          "internalType": "address",
  
          "name": "owner",
  
          "type": "address"
  
        },
  
        {
  
          "indexed": true,
  
          "internalType": "address",
  
          "name": "approved",
  
          "type": "address"
  
        },
  
        {
  
          "indexed": true,
  
          "internalType": "uint256",
  
          "name": "tokenId",
  
          "type": "uint256"
  
        }
  
      ],
  
      "name": "Approval",
  
      "type": "event"
  
    },
  
    {
  
      "anonymous": false,
  
      "inputs": [
  
        {
  
          "indexed": true,
  
          "internalType": "address",
  
          "name": "owner",
  
          "type": "address"
  
        },
  
        {
  
          "indexed": true,
  
          "internalType": "address",
  
          "name": "operator",
  
          "type": "address"
  
        },
  
        {
  
          "indexed": false,
  
          "internalType": "bool",
  
          "name": "approved",
  
          "type": "bool"
  
        }
  
      ],
  
      "name": "ApprovalForAll",
  
      "type": "event"
  
    },
  
    {
  
      "anonymous": false,
  
      "inputs": [
  
        {
  
          "indexed": true,
  
          "internalType": "address",
  
          "name": "previousOwner",
  
          "type": "address"
  
        },
  
        {
  
          "indexed": true,
  
          "internalType": "address",
  
          "name": "newOwner",
  
          "type": "address"
  
        }
  
      ],
  
      "name": "OwnershipTransferred",
  
      "type": "event"
  
    },
  
    {
  
      "anonymous": false,
  
      "inputs": [
  
        {
  
          "indexed": true,
  
          "internalType": "address",
  
          "name": "from",
  
          "type": "address"
  
        },
  
        {
  
          "indexed": true,
  
          "internalType": "address",
  
          "name": "to",
  
          "type": "address"
  
        },
  
        {
  
          "indexed": true,
  
          "internalType": "uint256",
  
          "name": "tokenId",
  
          "type": "uint256"
  
        }
  
      ],
  
      "name": "Transfer",
  
      "type": "event"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "bool",
  
          "name": "_active",
  
          "type": "bool"
  
        }
  
      ],
  
      "name": "activatedPresaleMint",
  
      "outputs": [],
  
      "stateMutability": "nonpayable",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "address",
  
          "name": "to",
  
          "type": "address"
  
        },
  
        {
  
          "internalType": "uint256",
  
          "name": "tokenId",
  
          "type": "uint256"
  
        }
  
      ],
  
      "name": "approve",
  
      "outputs": [],
  
      "stateMutability": "nonpayable",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "uint256",
  
          "name": "_tokenId",
  
          "type": "uint256"
  
        }
  
      ],
  
      "name": "burn",
  
      "outputs": [],
  
      "stateMutability": "nonpayable",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "uint8",
  
          "name": "_rarity",
  
          "type": "uint8"
  
        },
  
        {
  
          "internalType": "uint8",
  
          "name": "_percentage",
  
          "type": "uint8"
  
        }
  
      ],
  
      "name": "changeNormalRarity",
  
      "outputs": [],
  
      "stateMutability": "nonpayable",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "uint8",
  
          "name": "_rarity",
  
          "type": "uint8"
  
        },
  
        {
  
          "internalType": "uint8",
  
          "name": "_percentage",
  
          "type": "uint8"
  
        }
  
      ],
  
      "name": "changePresaleRarity",
  
      "outputs": [],
  
      "stateMutability": "nonpayable",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "uint256",
  
          "name": "_rarity",
  
          "type": "uint256"
  
        },
  
        {
  
          "internalType": "string",
  
          "name": "_image",
  
          "type": "string"
  
        }
  
      ],
  
      "name": "initImages",
  
      "outputs": [],
  
      "stateMutability": "nonpayable",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "uint8",
  
          "name": "_maxlevel",
  
          "type": "uint8"
  
        }
  
      ],
  
      "name": "initMaxLevel",
  
      "outputs": [],
  
      "stateMutability": "nonpayable",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "uint8",
  
          "name": "_rarity",
  
          "type": "uint8"
  
        },
  
        {
  
          "internalType": "string",
  
          "name": "_special",
  
          "type": "string"
  
        }
  
      ],
  
      "name": "initSpecials",
  
      "outputs": [],
  
      "stateMutability": "nonpayable",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "uint8",
  
          "name": "_rarity",
  
          "type": "uint8"
  
        },
  
        {
  
          "internalType": "string",
  
          "name": "_weapon",
  
          "type": "string"
  
        }
  
      ],
  
      "name": "initWeapons",
  
      "outputs": [],
  
      "stateMutability": "nonpayable",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [],
  
      "name": "mint",
  
      "outputs": [],
  
      "stateMutability": "payable",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [],
  
      "name": "renounceOwnership",
  
      "outputs": [],
  
      "stateMutability": "nonpayable",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "address",
  
          "name": "from",
  
          "type": "address"
  
        },
  
        {
  
          "internalType": "address",
  
          "name": "to",
  
          "type": "address"
  
        },
  
        {
  
          "internalType": "uint256",
  
          "name": "tokenId",
  
          "type": "uint256"
  
        }
  
      ],
  
      "name": "safeTransferFrom",
  
      "outputs": [],
  
      "stateMutability": "nonpayable",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "address",
  
          "name": "from",
  
          "type": "address"
  
        },
  
        {
  
          "internalType": "address",
  
          "name": "to",
  
          "type": "address"
  
        },
  
        {
  
          "internalType": "uint256",
  
          "name": "tokenId",
  
          "type": "uint256"
  
        },
  
        {
  
          "internalType": "bytes",
  
          "name": "_data",
  
          "type": "bytes"
  
        }
  
      ],
  
      "name": "safeTransferFrom",
  
      "outputs": [],
  
      "stateMutability": "nonpayable",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "address",
  
          "name": "operator",
  
          "type": "address"
  
        },
  
        {
  
          "internalType": "bool",
  
          "name": "approved",
  
          "type": "bool"
  
        }
  
      ],
  
      "name": "setApprovalForAll",
  
      "outputs": [],
  
      "stateMutability": "nonpayable",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "address",
  
          "name": "from",
  
          "type": "address"
  
        },
  
        {
  
          "internalType": "address",
  
          "name": "to",
  
          "type": "address"
  
        },
  
        {
  
          "internalType": "uint256",
  
          "name": "tokenId",
  
          "type": "uint256"
  
        }
  
      ],
  
      "name": "transferFrom",
  
      "outputs": [],
  
      "stateMutability": "nonpayable",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "address",
  
          "name": "newOwner",
  
          "type": "address"
  
        }
  
      ],
  
      "name": "transferOwnership",
  
      "outputs": [],
  
      "stateMutability": "nonpayable",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "address",
  
          "name": "_token",
  
          "type": "address"
  
        }
  
      ],
  
      "stateMutability": "nonpayable",
  
      "type": "constructor"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "address",
  
          "name": "owner",
  
          "type": "address"
  
        }
  
      ],
  
      "name": "balanceOf",
  
      "outputs": [
  
        {
  
          "internalType": "uint256",
  
          "name": "",
  
          "type": "uint256"
  
        }
  
      ],
  
      "stateMutability": "view",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "uint256",
  
          "name": "tokenId",
  
          "type": "uint256"
  
        }
  
      ],
  
      "name": "getApproved",
  
      "outputs": [
  
        {
  
          "internalType": "address",
  
          "name": "",
  
          "type": "address"
  
        }
  
      ],
  
      "stateMutability": "view",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [],
  
      "name": "GXGToken",
  
      "outputs": [
  
        {
  
          "internalType": "contract ERC20",
  
          "name": "",
  
          "type": "address"
  
        }
  
      ],
  
      "stateMutability": "view",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "address",
  
          "name": "owner",
  
          "type": "address"
  
        },
  
        {
  
          "internalType": "address",
  
          "name": "operator",
  
          "type": "address"
  
        }
  
      ],
  
      "name": "isApprovedForAll",
  
      "outputs": [
  
        {
  
          "internalType": "bool",
  
          "name": "",
  
          "type": "bool"
  
        }
  
      ],
  
      "stateMutability": "view",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [],
  
      "name": "name",
  
      "outputs": [
  
        {
  
          "internalType": "string",
  
          "name": "",
  
          "type": "string"
  
        }
  
      ],
  
      "stateMutability": "view",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [],
  
      "name": "owner",
  
      "outputs": [
  
        {
  
          "internalType": "address",
  
          "name": "",
  
          "type": "address"
  
        }
  
      ],
  
      "stateMutability": "view",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "uint256",
  
          "name": "tokenId",
  
          "type": "uint256"
  
        }
  
      ],
  
      "name": "ownerOf",
  
      "outputs": [
  
        {
  
          "internalType": "address",
  
          "name": "",
  
          "type": "address"
  
        }
  
      ],
  
      "stateMutability": "view",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "uint256",
  
          "name": "",
  
          "type": "uint256"
  
        }
  
      ],
  
      "name": "spaceships",
  
      "outputs": [
  
        {
  
          "internalType": "uint256",
  
          "name": "number",
  
          "type": "uint256"
  
        },
  
        {
  
          "internalType": "string",
  
          "name": "image",
  
          "type": "string"
  
        },
  
        {
  
          "internalType": "string",
  
          "name": "weapon1",
  
          "type": "string"
  
        },
  
        {
  
          "internalType": "string",
  
          "name": "weapon2",
  
          "type": "string"
  
        },
  
        {
  
          "internalType": "string",
  
          "name": "weapon3",
  
          "type": "string"
  
        },
  
        {
  
          "internalType": "string",
  
          "name": "special",
  
          "type": "string"
  
        },
  
        {
  
          "internalType": "uint8",
  
          "name": "rarity",
  
          "type": "uint8"
  
        },
  
        {
  
          "internalType": "uint8",
  
          "name": "level",
  
          "type": "uint8"
  
        },
  
        {
  
          "internalType": "uint256",
  
          "name": "durability",
  
          "type": "uint256"
  
        },
  
        {
  
          "internalType": "uint256",
  
          "name": "health",
  
          "type": "uint256"
  
        },
  
        {
  
          "internalType": "uint256",
  
          "name": "speed",
  
          "type": "uint256"
  
        }
  
      ],
  
      "stateMutability": "view",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "bytes4",
  
          "name": "interfaceId",
  
          "type": "bytes4"
  
        }
  
      ],
  
      "name": "supportsInterface",
  
      "outputs": [
  
        {
  
          "internalType": "bool",
  
          "name": "",
  
          "type": "bool"
  
        }
  
      ],
  
      "stateMutability": "view",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [],
  
      "name": "symbol",
  
      "outputs": [
  
        {
  
          "internalType": "string",
  
          "name": "",
  
          "type": "string"
  
        }
  
      ],
  
      "stateMutability": "view",
  
      "type": "function"
  
    },
  
    {
  
      "inputs": [
  
        {
  
          "internalType": "uint256",
  
          "name": "tokenId",
  
          "type": "uint256"
  
        }
  
      ],
  
      "name": "tokenURI",
  
      "outputs": [
  
        {
  
          "internalType": "string",
  
          "name": "",
  
          "type": "string"
  
        }
  
      ],
  
      "stateMutability": "view",
  
      "type": "function"
  
    }
  
  ];
  
      let contract = new web3.eth.Contract(contractAbi, "MY_CONTRACT_ADDRESS");
  
      let transaction = contract.methods.initMaxLevel(30);
  
      let options = {
  
          to  : transaction._parent._address,
  
          data: transaction.encodeABI(),
  
          gas : await transaction.estimateGas(),
  
      };
  
      let signedTransaction = await web3.eth.accounts.signTransaction(options,"CONTRACT_OWNER_PRIVATEKEY");
  
      //let transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  
     
  
      return signedTransaction;
  
  })
  
  