// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'ConsumerRole' to manage this role - add, remove, check
contract ConsumerRole {
    using Roles for Roles.Role;
    
    // Define 2 events, one for Adding, and other for Removing
    event ConsumerAdded(address consumerAddress);
    event ConsumerRemoved(address consumerAddress);

    // Define a struct 'consumers' by inheriting from 'Roles' library, struct Role
    Roles.Role private consumers;

    // In the constructor make the address that deploys this contract the 1st consumer
    constructor() {
        _addConsumer(msg.sender);
    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyConsumer() {
        require(consumers.has(msg.sender), "You are not a consumer");
        _;
    }

    // Define a function 'isConsumer' to check this role
    function isConsumer(address account) public view returns (bool) {
        return consumers.has(account);
    }

    // Define a function 'addConsumer' that adds this role
    function addConsumer(address account) public onlyConsumer {
        _addConsumer(account);
    }

    // Define a function 'renounceConsumer' to remove this role
    function renounceConsumer() public onlyConsumer {
        _removeConsumer(msg.sender);
    }

    // Define an internal function '_addConsumer' to add this role, called by 'addConsumer'
    function _addConsumer(address account) internal {
        consumers.add(account);
        emit ConsumerAdded(account);
    }

    // Define an internal function '_removeConsumer' to remove this role, called by 'renounceConsumer'
    function _removeConsumer(address account) internal {
        consumers.remove(account);
        emit ConsumerRemoved(account);
    }
}
