export const abi = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addOrganization",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_uuid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addRule",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_uuid",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ruleIndex",
				"type": "uint256"
			}
		],
		"name": "addUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_org",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_uuid",
				"type": "string"
			}
		],
		"name": "allow",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "_uuid",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ruleIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "userIndex",
				"type": "uint256"
			}
		],
		"name": "assign",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOrganization",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "uuid",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "bool",
								"name": "active",
								"type": "bool"
							},
							{
								"internalType": "uint256",
								"name": "index",
								"type": "uint256"
							},
							{
								"components": [
									{
										"internalType": "address",
										"name": "owner",
										"type": "address"
									},
									{
										"internalType": "string",
										"name": "name",
										"type": "string"
									},
									{
										"internalType": "bool",
										"name": "active",
										"type": "bool"
									},
									{
										"internalType": "uint256",
										"name": "index",
										"type": "uint256"
									}
								],
								"internalType": "struct DotAuth.User[]",
								"name": "users",
								"type": "tuple[]"
							}
						],
						"internalType": "struct DotAuth.Rule[]",
						"name": "rules",
						"type": "tuple[]"
					}
				],
				"internalType": "struct DotAuth.Organization",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRules",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "uuid",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "active",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "bool",
								"name": "active",
								"type": "bool"
							},
							{
								"internalType": "uint256",
								"name": "index",
								"type": "uint256"
							}
						],
						"internalType": "struct DotAuth.User[]",
						"name": "users",
						"type": "tuple[]"
					}
				],
				"internalType": "struct DotAuth.Rule[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_uuid",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "ruleIndex",
				"type": "uint8"
			}
		],
		"name": "removeRule",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];