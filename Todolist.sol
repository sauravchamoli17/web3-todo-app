// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TodoList {
    address public owner;

    constructor () {
      owner = msg.sender;
    }

    modifier onlyOwner {
       require(owner == msg.sender, "You can't call this function as you are not the owner of this contract.");
       _;
    }

    struct TaskItem {
       string task;
       bool isCompleted; 
       uint256 timestamp;
    }

    mapping (uint256 => TaskItem) public tasks;
    uint256 public count = 0;

    function addTask(string calldata task) public {
       TaskItem memory item = TaskItem({task: task, isCompleted: false, timestamp: block.timestamp});
       tasks[count] = item;
       count++;
    }

    function completeTask(uint256 id) public {
       require(!tasks[id].isCompleted, "Task Already Completed.");
       tasks[id].isCompleted = true;
    }
}