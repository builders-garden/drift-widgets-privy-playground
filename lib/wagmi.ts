import { createConfig } from "@privy-io/wagmi";
import { http } from "viem";
import { arbitrum, base, mainnet, optimism, polygon } from "viem/chains";

export const config = createConfig({
  chains: [base, mainnet, optimism, polygon, arbitrum],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
});
