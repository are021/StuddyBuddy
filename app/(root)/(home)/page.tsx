import GenerateSetLink from "@/components/home/GenerateSetLink";
import StudySetCarousel from "@/components/shared/carousel/StudySetCarousel";
import UserCarousel from "@/components/shared/carousel/UserCarousel";
import { getRecentStudySets } from "@/lib/actions/studyset.action";
import { getAllUsers } from "@/lib/actions/user.action";
// import { createClient } from "@/lib/supabase/server";
// import { redirect } from "next/navigation";

import React from "react";

// const dummySets = [
//   {
//     id: 1,
//     name: "Example Set 1",
//     cards: 10,
//     author: {
//       name: "John Doe",
//       avatar: "/assets/images/avatar.png",
//     },
//   },
//   {
//     id: 2,
//     name: "Example Set 2",
//     cards: 10,
//     author: {
//       name: "John Doe",
//       avatar: "/assets/images/avatar.png",
//     },
//   },
//   {
//     id: 3,
//     name: "Example Set 3",
//     cards: 10,
//     author: {
//       name: "John Doe",
//       avatar: "/assets/images/avatar.png",
//     },
//   },
//   {
//     id: 4,
//     name: "Example Set 4",
//     cards: 10,
//     author: {
//       name: "John Doe",
//       avatar: "/assets/images/avatar.png",
//     },
//   },
// ];

const HomePage = async () => {
  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/login");
  // }
  const result = await getRecentStudySets();

  const userData = await getAllUsers();

  console.log("users", userData);

  return (
    <>
      <StudySetCarousel title="Your Sets" sets={result?.studySets || []} isTop />
      <GenerateSetLink />
      <StudySetCarousel title="Trending Sets" sets={result?.studySets || []} isTop={false} />
      <UserCarousel users={userData || []} />
    </>
  );
};

export default HomePage;
