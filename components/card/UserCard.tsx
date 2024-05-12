import React from "react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface IUserCardProps {
  id: number;
  avatar: string;
  username: string;
  sets: number;
}

const UserCard = ({ id, avatar, username, sets }: IUserCardProps) => {
  return (
    <Link href={`/profile/${id}`}>
      <div className="card-wrapper flex-center min-w-[200px] flex-col rounded-xl p-6">
        <Image
          src={avatar}
          alt="user profile"
          width={150}
          height={150}
          className="rounded-full"
        />
        <p className="base-medium mt-4 line-clamp-1 text-dark-200">
          {username}
        </p>
        <Badge className="mt-3 rounded-xl bg-slate-200">
          <p className="small-regular">
            <span className="small-medium">{sets}</span> sets
          </p>
        </Badge>
      </div>
    </Link>
  );
};

export default UserCard;
