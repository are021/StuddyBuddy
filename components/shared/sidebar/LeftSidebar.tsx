"use client";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { sidebarLinks } from "@/constants";
import { createClient } from "@/lib/supabase/client";

interface ISideBarContentProps {
  userId?: string;
}

export const SideBarContent = ({
  userId
}: ISideBarContentProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 flex-col gap-6">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        if (item.route === "/profile") {
          if (userId) {
            item.route = `${item.route}/${userId}`;
          } else {
            return null;
          }
        }

        return (
          <Link
            href={item.route}
            key={item.route}
            className={`${
              isActive
                ? "rounded-lg bg-primary-500 text-light-900"
                : "bg-transparent text-dark-300"
            } flex items-center justify-start gap-4 p-4`}
          >
            <Image src={item.imgURL} alt={item.label} width={20} height={20} className={`${isActive ? "invert" : "invert-0"}`} />
            <p
              className={`${
                isActive ? "base-bold" : "base-medium"
              } max-lg:hidden`}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

interface ILeftSidebarProps {
  userId?: string;
}

const LeftSidebar = ({
  userId
}: ILeftSidebarProps) => {
  const router = useRouter();
  return (
    <section className="custom-scrollbar light-border sticky left-0 top-0 flex h-screen w-fit flex-col justify-between overflow-y-auto rounded-xl border-r bg-light-900 p-6 pt-28 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <SideBarContent userId={userId} />

      <div className="flex flex-col gap-3">
        <Link href="/login">
          <Button className="small-medium btn-secondary w-full rounded-lg px-4 py-3" onClick={async () => {
            const supabase = await createClient();

            await supabase.auth.signOut();

            router.push("/login");
          }}>
            <Image
              src="/assets/icons/account.svg"
              alt="sign in"
              width={20}
              height={20}
              className="invert-colors lg:hidden"
            />
            <span className="invert-0 dark:invert max-lg:hidden">Logout</span>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default LeftSidebar;
