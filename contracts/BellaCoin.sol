// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Bella Coin
/// @notice A fixed-supply ERC-20-compatible token for technical demonstration.
contract BellaCoin is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 500_000_000 * 10 ** 18;

    constructor() ERC20("Bella Coin", "BLC") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
