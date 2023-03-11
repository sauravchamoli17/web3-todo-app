Web3 Todo App
=====================

This is a simple decentralized todo application built using Wagmi, RainbowKit and Ethers.js library. The contract owner can deploy the contract and then add or complete tasks.

Getting Started
---------------

1.  Clone the repository
2.  Install dependencies: `npm install`
3.  Start the application: `npm start`
4.  Compile and deploy the contract using Remix IDE and copy the contract address and ABI
5.  Update the `contractAddress` variable in `src/contract.js` with the copied address and ABI
6.  Refresh the app to load the updated contract address
7.  Connect to your Ethereum wallet and switch to the desired network
8.  Add new tasks by typing in the task description and clicking on "Add Task"
9.  Complete tasks by clicking on the checkbox next to the task

Features
--------

*   Deploy contract: the contract owner can deploy the Todolist contract on the polygon mumbai testnet 
*   Add task: add a new task to the list
*   Complete task: mark a task as completed
*   View task list: view a list of all tasks
*   View completed tasks: view a list of all completed tasks

Technologies Used
-----------------

*   Wagmi: A development platform that simplifies the creation and deployment of smart contracts on Ethereum.
*   Ethers.js: A collection of libraries that allows you to interact with a local or remote Ethereum node using HTTP, IPC or WebSocket.
*   RainbowKit: For Wallet Connection.

Deployment
----------

This application can be deployed on any network that is supported by Wagmi.

Contributing
------------

Contributions are always welcome! Please feel free to open an issue or submit a pull request.

License
-------

This project is licensed under the MIT License.
