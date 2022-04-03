// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SaulGoodmanAgreements is ERC721, ERC721URIStorage, ERC721Burnable {
    event AgreementCreation(address indexed account, uint256 tokenId, string uri);
    event AgreementBurn(address indexed account, uint256 tokenId, string uri);

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("SaulGoodmanAgreements", "NOTE") {}

    function mint(string memory uri) external {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        
        emit AgreementCreation(msg.sender, tokenId, uri);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721)
    {
        require(from == address(0) || to == address(0), "SaulGoodman contracts are not transferable");
        super._beforeTokenTransfer(from, to, tokenId);
    }


    // As any good layer we burn contracts :D
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        emit AgreementBurn(msg.sender, tokenId, tokenURI(tokenId));
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}