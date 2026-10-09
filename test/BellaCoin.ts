import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { network } from "hardhat";
import { parseUnits } from "viem";

describe("BellaCoin", async function () {
  const { viem } = await network.create();
  const [deployer, recipient, spender] = await viem.getWalletClients();

  it("sets the requested token metadata", async function () {
    const token = await viem.deployContract("BellaCoin");

    assert.equal(await token.read.name(), "Bella Coin");
    assert.equal(await token.read.symbol(), "BLC");
    assert.equal(await token.read.decimals(), 18);
  });

  it("mints exactly 500 million BLC to the deployer", async function () {
    const token = await viem.deployContract("BellaCoin");
    const expectedSupply = parseUnits("500000000", 18);

    assert.equal(await token.read.totalSupply(), expectedSupply);
    assert.equal(
      await token.read.balanceOf([deployer.account.address]),
      expectedSupply,
    );
  });

  it("transfers tokens using standard ERC-20 behavior", async function () {
    const token = await viem.deployContract("BellaCoin");
    const amount = parseUnits("125", 18);

    await token.write.transfer([recipient.account.address, amount]);

    assert.equal(await token.read.balanceOf([recipient.account.address]), amount);
  });

  it("supports ERC-20 allowances and transferFrom", async function () {
    const token = await viem.deployContract("BellaCoin");
    const amount = parseUnits("50", 18);

    await token.write.approve([spender.account.address, amount]);
    await token.write.transferFrom(
      [deployer.account.address, recipient.account.address, amount],
      { account: spender.account },
    );

    assert.equal(await token.read.balanceOf([recipient.account.address]), amount);
    assert.equal(
      await token.read.allowance([
        deployer.account.address,
        spender.account.address,
      ]),
      0n,
    );
  });

  it("does not expose an external mint function", async function () {
    const token = await viem.deployContract("BellaCoin");
    const functionNames: string[] = token.abi
      .filter((entry) => entry.type === "function")
      .map((entry) => entry.name);

    assert.equal(functionNames.includes("mint"), false);
  });
});
