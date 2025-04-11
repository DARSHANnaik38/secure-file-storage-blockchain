// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    string public ipfsHash;

    function setHash(string memory _ipfsHash) public {
        ipfsHash = _ipfsHash;
    }

    function getHash() public view returns (string memory) {
        return ipfsHash;
    }
}
