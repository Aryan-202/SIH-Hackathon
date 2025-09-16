// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract TouristRegistry {
    mapping(string => bytes32) public touristHash;

    function addTourist(string memory name) public {
        touristHash[name] = keccak256(abi.encodePacked(name, block.timestamp));
    }

    function getHashID(string memory name) public view returns (bytes32) {
        return touristHash[name];
    }
}
