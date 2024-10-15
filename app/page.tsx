"use client";

import { useAccount, useWalletClient } from "wagmi";
import { Code, monokai } from "react-code-blocks";
import { Button, Divider, Input } from "@nextui-org/react";
import { DriftOfframp, DriftOfframpModal } from "@buildersgarden/drift";
import {
  useLogin,
  useLogout,
  usePrivy,
  useWallets,
} from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import { useMemo, useEffect, useState } from "react";
import Link from "next/link";
import { Book, Github } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const { authenticated, ready } = usePrivy();
  const { login } = useLogin();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { setActiveWallet } = useSetActiveWallet();
  const { wallets } = useWallets();
  const { logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
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
      <div className="flex flex-col gap-8 md:gap-12 justify-center items-center px-4 md:px-48 py-12 md:py-24">
        <div className="flex flex-row gap-4 justify-center items-center">
          <Link
            href="https://github.com/builders-garden/drift-widgets-privy-playground/"
            target="_blank"
          >
            <Button
              radius="sm"
              size="sm"
              className="text-black border-black"
              variant="bordered"
              startContent={<Github className="w-4 h-4" />}
            >
              Github
            </Button>
          </Link>
          <Link
            href="https://builders-garden.notion.site/Drift-SDK-Documentation-120679ed099e80e3a31aeb1567e79d12"
            target="_blank"
          >
            <Button
              radius="sm"
              size="sm"
              className="text-black border-black"
              variant="bordered"
              startContent={<Book className="w-4 h-4" />}
            >
              Docs
            </Button>
          </Link>
        </div>
        <div className="text-2xl md:text-4xl font-black text-center">
          Drift Widgets Playground - Privy
        </div>
        <div className="flex flex-col gap-4 justify-center items-center w-full max-w-md">
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
            <div className="flex flex-col gap-4 w-full max-w-md">
              <div className="w-full">
                <DriftOfframp walletClient={walletClient as never} />
              </div>
              <Button
                onClick={() => setIsOpen(true)}
                color="primary"
                className="w-full"
              >
                Open Offramp Modal Version
              </Button>

              <DriftOfframpModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                walletClient={walletClient as never}
              />
            </div>
          )}
        </div>
        <Divider className="w-1/3" />
        <Image
          src="/images/code.svg"
          alt="Drift Widgets Code"
          className="w-full max-w-[450px] md:max-w-[550px] lg:max-w-[650px] h-auto"
          width={700}
          height={700}
        />
      </div>
    </div>
  );
}
