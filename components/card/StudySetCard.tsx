import React from "react";

import Image from "next/image";
import Link from "next/link";

interface IStudySetCardProps {
  id: number;
  name: string;
  cards: number;
  authorName: string;
  authorAvatar: string;
}

const StudySetCard = ({
  id,
  name,
  cards,
  authorName,
  authorAvatar,
}: IStudySetCardProps) => {
  return (
    <Link href={`/sets/${id}`}>
      <div className="card-wrapper flex min-h-[175px] min-w-[275px] flex-col justify-between rounded-xl p-6">
        <div>
          <h4 className="base-medium line-clamp-1 text-dark-200">{name}</h4>
          <p className="mt-2 text-dark-400">{cards} cards</p>
        </div>
        <div className="flex items-center gap-4">
          <Image
            src={authorAvatar}
            alt="author"
            width={20}
            height={20}
            className="rounded-full"
          />
          <p className="text-dark-400">{authorName}</p>
        </div>
      </div>
    </Link>
  );
};

export default StudySetCard;
