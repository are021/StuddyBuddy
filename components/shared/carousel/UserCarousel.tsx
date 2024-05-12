import React from 'react';
import UserCard from '@/components/card/UserCard';

interface IUserCarouselProps {
    users: {
        id: number;
        avatar: string;
        username: string;
        sets: number;
    }[];
}

const UserCarousel = ({
    users
}: IUserCarouselProps) => {
  return (
    <div className="mt-10 w-full">
        <h2 className="h2-semibold text-dark-200">Browse Users</h2>
        <div className="mt-6 flex w-full gap-6 overflow-x-auto">
          {users.map((item) => (
            <UserCard key={item.id} id={item.id} avatar={item.avatar} username={item.username} sets={item.sets} />
          ))}
        </div>
      </div>
  )
}

export default UserCarousel