"use client";

import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/wagmi";
import { DriftProvider } from "@buildersgarden/drift";
import { WagmiProvider } from "@privy-io/wagmi";
import { PrivyProvider } from "@privy-io/react-auth";
import { base, baseSepolia } from "viem/chains";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
        config={{
          // Customize Privy's appearance in your app
          appearance: {
            theme: "light",
            accentColor: "#676FFF",
          },
          // Create embedded wallets for users who don't have a wallet
          embeddedWallets: {
            createOnLogin: "all-users",
            noPromptOnSignature: true,
          },
          defaultChain: base,
          supportedChains: [base, baseSepolia],
        }}
      >
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config} >
            <DriftProvider
              appId={process.env.NEXT_PUBLIC_DRIFT_APP_ID as string}
              appSecret={process.env.NEXT_PUBLIC_DRIFT_APP_SECRET as string}
            >
              <main className="h-full">{children}</main>
            </DriftProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </PrivyProvider>
    </NextUIProvider>
  );
}
