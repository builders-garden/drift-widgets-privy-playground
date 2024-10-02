import { createConfig } from "@privy-io/wagmi";
import { http } from "viem";
import { base, baseSepolia } from "viem/chains";

export const config = createConfig({
  chains: [base, baseSepolia],
  ssr: true,
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});
