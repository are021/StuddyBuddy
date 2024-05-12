"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";

const GlobalSearchBar = () => {
  const [term, setTerm] = useState("");

  return (
    <div className="relative w-full max-w-[450px] max-lg:hidden xl:max-w-[600px]">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-3xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
        />
        <Input
          type="text"
          placeholder="Search globally"
          value={term}
          className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-inherit shadow-none outline-none"
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default GlobalSearchBar;
