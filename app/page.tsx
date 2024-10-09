"use client";

import { useAccount, useWalletClient } from "wagmi";
import { Code, monokai } from "react-code-blocks";
import { Button, Divider, Input } from "@nextui-org/react";
import { DriftOfframp } from "@buildersgarden/drift";
import {
  useLogin,
  useLogout,
  usePrivy,
  useWallets,
} from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import { useMemo, useEffect } from "react";

export default function Home() {
  const { authenticated, ready } = usePrivy();
  const { login } = useLogin();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { setActiveWallet } = useSetActiveWallet();
  const { wallets } = useWallets();
  const { logout } = useLogout();
  const embeddedWallet = useMemo(
    () => wallets.find((wallet) => wallet.walletClientType === "privy"),
    [wallets]
  );

  useEffect(() => {
    if (embeddedWallet) {
      setActiveWallet(embeddedWallet);
    }
  }, [embeddedWallet, setActiveWallet]);

  return (
    <div className="min-h-screen min-w-screen text-black">
      <div className="flex flex-col gap-12 justify-center items-center px-48 py-24">
        <div className="text-4xl font-black">
          Drift Widgets Playground - Privy
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          {!authenticated && (
            <Button
              className="bg-black text-white"
              radius="md"
              onClick={() => login()}
            >
              Login
            </Button>
          )}
          {authenticated && (
            <div className="flex flex-col gap-2 w-full">
              <Input
                label="Embedded Wallet Address"
                isReadOnly
                value={embeddedWallet?.address || ""}
                variant="flat"
                classNames={{
                  input: "text-gray-500",
                  label: "text-gray-700",
                }}
                endContent={
                  <Button
                    className="bg-white text-black"
                    radius="md"
                    onClick={() => {
                      setActiveWallet(embeddedWallet!);
                    }}
                  >
                    Set Active
                  </Button>
                }
              />
              <Input
                label="Active Address"
                isReadOnly
                value={address || ""}
                variant="bordered"
                classNames={{
                  input: "text-gray-500",
                  label: "text-gray-700",
                }}
              />
              <Input
                label="Connected Address"
                isReadOnly
                value={walletClient?.account.address || ""}
                variant="bordered"
                classNames={{
                  input: "text-gray-500",
                  label: "text-gray-700",
                }}
              />
              <Button color="danger" radius="md" onClick={() => logout()}>
                Logout
              </Button>
            </div>
          )}
          {authenticated && ready && walletClient && (
            <div className=" w-fit">
              <DriftOfframp
                walletClient={walletClient as never}
                driftUserId="d36fc997-7264-4b7f-8c81-d09c22a87e1c"
              />
            </div>
          )}
        </div>
        <Divider className="w-1/3" />
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="text-xl font-bold">How to use</div>
          <Code
            text={"yarn add @buildersgarden/drift"}
            language={"tsx"}
            showLineNumbers={false}
            theme={monokai}
          />
          <Code
            text={
              "import {DriftOfframp, DriftProvider} from '@buildersgarden/drift'"
            }
            language={"tsx"}
            showLineNumbers={false}
            theme={monokai}
          />
          <Code
            text={
              "<DriftProvider appId={'id'} appSecret={'secret'}>\n   /* ... */\n   <DriftOfframp walletClient={walletClient} />\n   /* ... */\n<DriftProvider/>"
            }
            language={"tsx"}
            showLineNumbers={false}
            theme={monokai}
          />
        </div>
      </div>
    </div>
  );
}
