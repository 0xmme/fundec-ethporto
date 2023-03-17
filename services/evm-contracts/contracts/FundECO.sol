// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";

contract FundECO is ERC1155, ERC1155URIStorage {
    constructor() ERC1155("") {
      _setBaseURI("ipfs://");
    }


    function mintUri(   address account,
        uint256 id,
        string memory tokenURI,
        bytes memory data) external {
                  _mint(account, id, 1, data);
                  _setURI(id,tokenURI);

          
        }
        function uri(uint tokenId) public view override(ERC1155, ERC1155URIStorage) returns (string memory) {
            return super.uri(tokenId);
        }

    function mint(
        address account,
        uint256 id,
        bytes memory data
    ) external {
        _mint(account, id, 1, data);
    }

  
}