export const contractABI = [
    [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_jobId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_rating",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_review",
                    "type": "string"
                }
            ],
            "name": "completeJob",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_freelancer",
                    "type": "address"
                }
            ],
            "name": "createJob",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "freelancer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "portfolioIPFS",
                    "type": "string"
                }
            ],
            "name": "FreelancerRegistered",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "jobId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "rating",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "review",
                    "type": "string"
                }
            ],
            "name": "JobCompleted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "jobId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "client",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "freelancer",
                    "type": "address"
                }
            ],
            "name": "JobCreated",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_portfolioIPFS",
                    "type": "string"
                }
            ],
            "name": "registerFreelancer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "freelancers",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "exists",
                    "type": "bool"
                },
                {
                    "internalType": "string",
                    "name": "portfolioIPFS",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "totalRatings",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "numberOfRatings",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_freelancer",
                    "type": "address"
                }
            ],
            "name": "getFreelancerRating",
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
            "inputs": [],
            "name": "jobCounter",
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
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "jobs",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "client",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "freelancer",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "completed",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "rating",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "review",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
  ];
  