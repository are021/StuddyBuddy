import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GlobalSearchBar from "../GlobalSearchBar";
import MobileNavbar from "./MobileNavbar";

const Navbar = ({
  userId,
}: {
  userId?: string;
}) => {
  return (
    <nav className="fixed z-50 flex min-h-[80px] w-full items-center justify-between bg-light-900 px-6 sm:px-14 lg:min-h-[100px]">
      <Link href="/" className="flex items-center gap-3">
        <p className="h2-bold text-dark-100">
          StudyBuddy<span className="text-primary-500">.ai</span>
        </p>
      </Link>
      <GlobalSearchBar />
      <Link href="/sets/create">
        <Button className="flex min-w-[156px] gap-2 rounded-xl bg-primary-500 text-dark-100 max-sm:hidden">
          <Image
            src="/assets/icons/stars.svg"
            width={20}
            height={20}
            alt="stars"
          />
          <p className="paragraph-medium">Create Study Set</p>
        </Button>
      </Link>
      <div className="flex gap-3 sm:hidden">
        <Button
          variant="outline"
          className="rounded-full border border-dark-100"
        >
          <Image
            src="/assets/icons/stars.svg"
            width={24}
            height={24}
            alt="notification"
          />
        </Button>
        <MobileNavbar userId={userId} />
      </div>
    </nav>
  );
};

export default Navbar;
