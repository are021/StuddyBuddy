import StudySetCard from "@/components/card/StudySetCard";
import { getUserById } from "@/lib/actions/user.action";
import { formatTimestamp } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface IURLProps {
  params: {
    id: string;
  };
}

const ProfilePage = async ({ params }: IURLProps) => {
  const result = await getUserById({
    userId: params.id,
  });

  console.log("result", result?.user.studySets);

  return (
    <>
      <div className="flex flex-col gap-6">
        <Image
          src={result?.user.avatar || "/assets/images/avatar.png"}
          alt={result?.user.username}
          width={150}
          height={150}
          className="rounded-full"
        />
        <div className="flex flex-col gap-3">
          <h2 className="h2-semibold">{result?.user.username}</h2>
          <p className="paragraph-regular">
            Joined {formatTimestamp(result?.user.createdAt)}
          </p>
        </div>
      </div>
      <div className="mt-10 w-full">
        <h3 className="h3-semibold">Study sets</h3>
        <div className="mt-6 flex flex-wrap gap-4">
            {result?.user.studySets.length ? result?.user.studySets.map((item: any) => (
                <StudySetCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    cards={item.cards}
                    authorName={result?.user.username}
                    authorAvatar={result?.user.avatar}
                />
            )) : (
                <div>
                    <p className="paragraph-regular text-dark-400">This user has not created a study set yet</p>
                </div>
            )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
