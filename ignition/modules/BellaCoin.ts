import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("BellaCoinModule", (m) => {
  const bellaCoin = m.contract("BellaCoin");

  return { bellaCoin };
});
