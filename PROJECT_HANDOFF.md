# Bella Coin (BLC) — Project Report and AI Handoff

Last updated: 2026-10-09  
Workspace: `/Users/imtech/Workspace/bella-coin`

## 1. Purpose and goal

Bella Coin is a learning and demonstration project. Its purpose is to show what is technically required to create and publish the basic token layer of a fixed-supply BEP-20 token on BNB Smart Chain.

The project was motivated by a claim that creating a token similar to Zelion (ZLN) is unusually difficult or requires special blockchain connections. Bella Coin is an independent project and must not copy Zelion branding, code, website content, or other intellectual property.

The intended final demonstration is:

```text
Bella Coin (BLC)
500,000,000 fixed supply
        ↓
Solidity smart contract
        ↓
BNB Smart Chain Testnet deployment
        ↓
Verified source on testnet BscScan
        ↓
Visible in MetaMask
        ↓
Optional testnet liquidity and swap demonstration
```

The project should demonstrate the distinction between:

```text
Basic token:
contract + deployment + wallet + liquidity + DEX

Full cryptocurrency project:
token + infrastructure + products + integrations + users + liquidity
+ security + legal/operational work + ongoing development
```

Creating the basic token is relatively straightforward. Reproducing an entire infrastructure or commercial ecosystem is a much larger undertaking.

## 2. Bella Coin specification

| Property | Value |
|---|---|
| Name | Bella Coin |
| Symbol | BLC |
| Network target | BNB Smart Chain |
| Standard | ERC-20 / BEP-20-compatible |
| Total supply | 500,000,000 BLC |
| Decimals | 18 |
| Additional minting | None |
| Transaction tax | 0% (no tax code) |
| Initial holder | Deploying wallet receives the full supply |
| Owner/admin controls | None |
| Purpose | Technical learning and demonstration |

## 3. What has been completed

### Project setup

- Hardhat 3 TypeScript project configured.
- Official Hardhat Viem toolbox installed.
- OpenZeppelin Contracts used for the token implementation.
- Node's built-in test runner is used through Hardhat.
- Generated files, dependencies, `.env` files, and Ignition deployment records are ignored by Git.

Installed direct dependencies at the last verified checkpoint:

```text
hardhat                                      3.17.0
@nomicfoundation/hardhat-toolbox-viem       5.0.7
@openzeppelin/contracts                     5.6.1
viem                                        2.56.9
typescript                                  6.0.3
@types/node                                 22.20.4
```

### Smart contract

The implementation is in `contracts/BellaCoin.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BellaCoin is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 500_000_000 * 10 ** 18;

    constructor() ERC20("Bella Coin", "BLC") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
```

Important properties:

- It delegates standard token accounting to OpenZeppelin ERC-20.
- The constructor creates the full supply once and assigns it to `msg.sender`, the deploying account.
- `10 ** 18` converts 500 million displayed tokens into ERC-20 base units.
- There is no public or external mint function.
- There is no tax, pause, blacklist, upgrade, proxy, or privileged owner functionality.
- The deploying wallet controls the tokens it receives, but it does not receive special contract administration powers.

### Compilation and tests

The project compiles using Solidity 0.8.28 with the optimizer enabled for 200 runs. The contract pragma and OpenZeppelin version are compatible with this compiler.

Commands:

```bash
npm run compile
npm test
npx tsc --noEmit
```

Last verified result on 2026-10-09:

```text
5 passing (5 nodejs)
TypeScript check passed
```

Tests in `test/BellaCoin.ts` cover:

- Name: `Bella Coin`
- Symbol: `BLC`
- Decimals: `18`
- Total supply: exactly 500,000,000 BLC
- Full initial supply assigned to the deployer
- Standard transfers
- ERC-20 approvals and `transferFrom`
- Absence of an external `mint` function

### Testnet configuration

`hardhat.config.ts` contains a BSC Testnet network:

```text
Network key: bscTestnet
Chain ID:    97
Type:        HTTP / EVM L1
Default RPC: https://bsc-testnet-dataseed.bnbchain.org
Secret key:  BSC_TESTNET_PRIVATE_KEY
```

The RPC can be overridden with the `BSC_TESTNET_RPC_URL` Hardhat configuration variable. The deployment private key is expected in Hardhat's encrypted production keystore, not in source code or `.env` committed to the repository.

The reproducible Ignition deployment module is:

```text
ignition/modules/BellaCoin.ts
```

The prepared deployment command is:

```bash
npm run deploy:testnet
```

No deployment has been performed yet.

## 4. Zelion comparison performed during the discussion

The corrected ZLN contract examined was:

```text
0x9d9c5c7b7bfc398ed446b7e53a8ad8d62dcd0181
```

Direct BNB Smart Chain RPC calls returned:

```text
Name:         Zelion
Symbol:       ZLN
Decimals:     18
Total supply: 500,000,000 ZLN
Compiler metadata: Solidity 0.8.20
Proxy slot:   empty (not an EIP-1967 proxy)
```

Observed ZLN interface/bytecode characteristics:

- Standard balance, transfer, approval, and `transferFrom` behavior.
- No public mint function.
- No burn, pause, blacklist, or transaction-tax functions observed.
- It has `owner()` and `transferOwnership(address)`.
- No observed privileged token operation was attached to ownership.

Bella Coin reproduces the main fixed-supply token economics but is not byte-for-byte identical:

| Feature | Zelion | Bella Coin |
|---|---|---|
| Supply | 500M | 500M |
| Decimals | 18 | 18 |
| Tax logic | None observed | None |
| Additional minting | None | None |
| Standard transfers | Yes | Yes |
| Proxy/upgradeability | No | No |
| Ownership field | Yes | No |
| Implementation | Simpler/custom ERC-20 | OpenZeppelin 5.6.1 ERC-20 |

Bella intentionally omits ownership because there are no administrative operations to perform. Adding ownership merely to imitate ZLN's interface would add unnecessary state without useful functionality.

An earlier address supplied during the discussion (`0x79fa...0F42`) was checked and found to be Buzzex/BUZ with a 300 million supply, not Zelion. Do not use it for the ZLN comparison.

## 5. MetaMask and wallet state

The user is new to blockchain development and requested exactly one small instruction at a time.

Completed wallet steps:

1. MetaMask was already installed.
2. A dedicated account named `Bella Testnet` was created.
3. BNB Smart Chain Testnet was added to MetaMask.
4. The EVM address was selected as the default address type.
5. MetaMask displayed the BSC Testnet network and a balance of `0.100 tBNB`.

Public test account address:

```text
0x44e76BA60F3884f5f43eD03C072bF767059598a2
```

The balance was independently confirmed through the BSC Testnet RPC as exactly 0.1 tBNB at the time of checking. tBNB has no real monetary value and exists only for testnet gas.

### Critical security warning

The user accidentally entered the MetaMask private key directly as a command-line argument:

```text
npx hardhat keystore set <PRIVATE_KEY_WAS_ENTERED_HERE>
```

The command failed because Hardhat interpreted the private key as the configuration-variable name. Nevertheless, the private key was exposed in the conversation and saved in shell history.

The private key is deliberately not reproduced in this document.

Consequences:

- Treat the `Bella Testnet` account as compromised.
- It must never hold real assets or be used on mainnet.
- A deployment from it is acceptable only as a disposable testnet demonstration if the user explicitly accepts that risk.
- Any token supply deployed from it can be controlled/transferred by anyone who has obtained the exposed key.
- The safer recommendation is to create a fresh test account, transfer test tBNB to it, and use the fresh account for deployment.

The user explicitly said they were willing to continue with the exposed account because this is an unimportant testnet project. That permission does not extend to mainnet or real funds.

Current keystore status is unknown. The last instruction given was to run:

```bash
npx hardhat keystore set BSC_TESTNET_PRIVATE_KEY
```

and enter the private key only when Hardhat displays `Enter the secret`. The user has not yet confirmed successful storage.

Never ask the user to paste a private key, password, or recovery phrase into chat. Never reproduce the exposed key from conversation history.

## 6. Current project status

| Phase | Status |
|---|---|
| Hardhat initialization | Complete |
| BellaCoin contract | Complete |
| Compilation | Complete |
| Automated tests | Complete: 5 passing |
| BSC Testnet network configuration | Complete |
| Ignition deployment module | Complete |
| Testnet wallet creation | Complete |
| Testnet wallet funding | Complete: 0.1 tBNB |
| Secure key configuration | Not confirmed; security incident noted above |
| BSC Testnet deployment | Not started |
| BscScan source verification | Not started |
| MetaMask BLC import | Not started |
| Test transfer | Not started |
| Testnet DEX/liquidity demonstration | Not started |
| Mainnet | Prohibited without new, explicit confirmation |

## 7. Instructions for the next AI

### Working style

The user requested beginner-friendly, one-step-at-a-time guidance. Do not provide a long batch of actions for the user to perform. Give one concrete step, wait for completion or a screenshot, verify it, and only then continue.

Explain unfamiliar concepts briefly when they first appear. Avoid assuming knowledge of terminals, wallets, networks, gas, addresses, or explorers.

### Immediate next checkpoint

Ask whether the command below completed successfully:

```bash
npx hardhat keystore set BSC_TESTNET_PRIVATE_KEY
```

The correct interaction is:

1. The command argument is the literal name `BSC_TESTNET_PRIVATE_KEY`.
2. Hardhat asks for a new keystore password and confirmation.
3. Hardhat asks for the secret.
4. The private key is pasted only into the hidden `Enter the secret` prompt.

Do not ask the user to reveal any of those secret values.

Because the account is compromised, remind the user once before deployment that the deployment is disposable and testnet-only. Do not repeatedly derail the learning exercise after the warning and explicit acceptance.

### Before deployment

1. Confirm that the expected configuration-variable name exists in the keystore. Use the Hardhat keystore list command supported by the installed plugin; do not display the secret.
2. Run `npm test` again if code has changed.
3. Confirm the selected deployment account resolves to the funded public address without printing its private key.
4. Confirm chain ID 97 and a nonzero tBNB balance.
5. Explain that deployment broadcasts contract bytecode and permanently creates a testnet contract address. Gas will reduce the tBNB balance slightly.

### Deployment

Use the existing reproducible command:

```bash
npm run deploy:testnet
```

Hardhat may ask for the encrypted-keystore password and deployment confirmation. Do not bypass those prompts by putting secrets in command arguments or environment output.

Record after confirmation:

- Contract address
- Deployment transaction hash
- Network: BNB Smart Chain Testnet, chain ID 97
- Deployer public address
- Remaining tBNB balance

Persist only public deployment information in a suitable project document. Never persist or print the private key or keystore password.

### BscScan

After deployment, the public address page should be available at:

```text
https://testnet.bscscan.com/address/<CONTRACT_ADDRESS>
```

Deployment makes bytecode and transactions visible automatically. Source verification is a separate step that proves the public source recompiles to the deployed bytecode.

Use the current official Hardhat/BscScan verification procedure for Hardhat 3. The verification integration/API may change, so confirm current primary documentation before adding configuration. Preserve the compiler version and optimizer settings used for deployment.

### MetaMask token import

After deployment and confirmation:

1. Keep MetaMask on BNB Smart Chain Testnet.
2. Use the token import option.
3. Paste the new BellaCoin contract address.
4. Confirm symbol `BLC` and decimals `18`.
5. The deploying account should display `500,000,000 BLC`.

Explain that MetaMask is displaying a balance stored in the contract on the blockchain; the tokens are not files stored inside MetaMask.

### Post-deployment checks

Read from the deployed contract and verify:

- `name()` is `Bella Coin`.
- `symbol()` is `BLC`.
- `decimals()` is `18`.
- `totalSupply()` is `500000000 * 10^18` base units.
- The deployer initially owns the entire supply.

Optionally transfer a small amount of BLC to a second disposable testnet account and confirm both balances and the BscScan transfer event.

### DEX/liquidity phase

Only investigate a testnet liquidity pool after deployment, verification, MetaMask import, and a basic transfer all succeed.

Explain before acting:

- A token contract alone does not create a market price.
- A liquidity pool contains BLC and a paired test asset.
- The initial deposit ratio establishes the initial pool price.
- Low liquidity causes large price impact and slippage.
- Testnet liquidity has no real financial value.

Confirm the currently supported BSC Testnet DEX/router and contract addresses using primary documentation before any interaction. Do not assume old PancakeSwap testnet interfaces remain available.

### Mainnet prohibition

Do not deploy to BNB Smart Chain Mainnet, create a real-money liquidity pool, buy real BNB, or move real assets without fresh and explicit user approval.

Before any future mainnet action, require:

- A new uncompromised wallet, ideally a hardware wallet or multisig.
- Security review/audit proportional to intended use.
- Explanation of irreversible deployment and gas costs.
- Token allocation and vesting plan.
- Liquidity plan and custody controls.
- Legal/regulatory review appropriate to the user's jurisdiction and intended distribution.

## 8. File map

```text
contracts/BellaCoin.sol             Fixed-supply ERC-20/BEP-20 contract
test/BellaCoin.ts                   Automated token tests
hardhat.config.ts                   Compiler and BSC Testnet configuration
ignition/modules/BellaCoin.ts       Reproducible deployment module
package.json                        Build, test, and deploy scripts
package-lock.json                   Locked dependency graph
tsconfig.json                       TypeScript settings
.gitignore                          Secrets/generated-file exclusions
Create Bella Coin Token.pdf         User-provided project material
PROJECT_HANDOFF.md                  This report and continuation guide
```

## 9. Useful commands

Run from `/Users/imtech/Workspace/bella-coin`:

```bash
# Compile
npm run compile

# Test
npm test

# Type-check
npx tsc --noEmit

# Store the testnet private key securely (interactive secret prompts)
npx hardhat keystore set BSC_TESTNET_PRIVATE_KEY

# Deploy to BSC Testnet only
npm run deploy:testnet
```

Never place a private key directly after `keystore set`, in a shell command, in a source file, in `.env` committed to Git, in screenshots, or in chat.

## 10. GitHub and Windows portability

The project is portable to a standard 64-bit Intel/AMD Windows system. A clean-clone simulation using only repository files successfully completed:

```text
npm ci
npm run compile
npm test
npx tsc --noEmit
```

The result was five passing tests and a successful TypeScript check. The lockfile includes the required Windows x64 native packages.

### Windows prerequisites

Install:

- Git
- Node.js 22.13.0 or later
- npm

The project was developed and last tested with:

```text
Node.js 22.23.2
npm 10.9.8
```

Using the same versions is recommended for the most reproducible result.

### Clone and test on Windows

Open PowerShell and run:

```powershell
git clone <GITHUB_REPOSITORY_URL>
cd bella-coin
node --version
npm --version
npm ci
npm test
npm run compile
npx tsc --noEmit
```

Do not copy `node_modules` from macOS. `npm ci` uses `package-lock.json` to install the appropriate Windows binaries and exact locked dependency versions.

If Hardhat reports `HHE27: Native binding failed to load`, follow the current official Hardhat guidance. This can be caused by an older npm optional-dependency bug. Confirm that Node is at least 22.13, update npm to 11.3 or later if necessary, and regenerate/install dependencies only after reviewing the resulting lockfile changes.

### Files intentionally not transferred

The following are ignored by Git and will not be cloned:

```text
node_modules/
artifacts/
cache/
coverage/
dist/
.env
.env.*
ignition/deployments/
```

`node_modules`, `artifacts`, and `cache` are recreated by installation and compilation. Secrets must be configured separately on every machine.

Hardhat's encrypted production keystore is stored outside this repository. It does not transfer through GitHub. To configure a deployment account on Windows, run interactively:

```powershell
npx hardhat keystore set BSC_TESTNET_PRIVATE_KEY
```

Enter the private key only at Hardhat's hidden `Enter the secret` prompt. Never put it directly in the command or commit it to Git.

The tBNB balance and future BLC balances live on BNB Smart Chain, not on a specific computer. A properly configured wallet key can access the same blockchain account from macOS or Windows. The currently funded `Bella Testnet` key was exposed and must remain testnet-only; a fresh wallet is required for any future serious or mainnet use.

### Ignition deployment records

No deployment exists yet, so ignoring `ignition/deployments/` currently loses nothing. After the first testnet deployment, reconsider that ignore rule. Hardhat recommends committing the appropriate `ignition/deployments/<deployment-id>` directory because it records public deployment state and enables another machine to reproduce, resume, and verify the deployment.

Before committing deployment records, inspect them and confirm that they contain public deployment data only and no locally added secrets. Never commit private keys, passwords, recovery phrases, or `.env` secrets.

### Before pushing the current repository

At the time this section was written, `PROJECT_HANDOFF.md` was the only untracked file. Add and commit it explicitly:

```bash
git add PROJECT_HANDOFF.md
git commit -m "Add Bella Coin project handoff documentation"
git push
```

The project directory was scanned for private-key-shaped 64-character hexadecimal strings outside dependency and generated directories; none were found in the files intended for Git. Local shell history and this conversation are not part of the repository, but the exposed test key must still be treated as compromised.

## 11. Definition of success

The current learning milestone is complete when:

1. BellaCoin is deployed to BNB Smart Chain Testnet.
2. Its source is verified on testnet BscScan.
3. The deployment address and transaction hash are recorded.
4. MetaMask displays exactly 500,000,000 BLC for the deploying account.
5. A small BLC test transfer succeeds and is visible on BscScan.
6. The user can clearly explain the difference between the token contract, wallet display, explorer verification, and market liquidity.

Mainnet deployment and real-money trading are not part of this milestone.
