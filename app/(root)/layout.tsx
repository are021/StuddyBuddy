import Navbar from "@/components/shared/navbar/Navbar";
import LeftSidebar from "@/components/shared/sidebar/LeftSidebar";
import React from "react";

import { createClient } from "@/lib/supabase/server";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();


  return (
    <main className="relative bg-light-800">
      <Navbar userId={user?.id || ""} />
      <div className="flex">
        <LeftSidebar userId={user?.id || ""} />
        <section className="flex min-h-screen flex-1 flex-col overflow-y-auto px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
