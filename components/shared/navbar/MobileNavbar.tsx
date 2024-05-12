"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

interface INavContentProps {
  userId?: string;
}

const NavContent = ({
  userId
}: INavContentProps) => {
  const pathname = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
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
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "bg-primary-500 text-light-900"
                  : "bg-transparent text-dark-300 "
              } flex items-center justify-start gap-4 rounded-lg p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNavbar = ({
  userId
}: INavContentProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={30}
          height={30}
          alt="menu"
          className="cursor-pointer sm:hidden"
        />
      </SheetTrigger>
      <SheetContent side="left" className="border-none bg-light-900">
        <Link href="/" className="flex items-center gap-3">
          <p className="h2-bold text-dark100_light900">
            StudyBuddy
            <span className="text-primary-500">.ai</span>
          </p>
        </Link>
        <div className="flex h-[80vh] flex-col">
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <div className="flex flex-col gap-3">
            <SheetClose asChild>
              <Link href="/sign-in">
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="invert-0 dark:text-primary-500">Log In</span>
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/sign-up">
                <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="invert-0 dark:text-primary-500">
                    Sign Up
                  </span>
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
