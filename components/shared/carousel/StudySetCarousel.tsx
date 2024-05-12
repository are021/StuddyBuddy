import React from 'react';
import StudySetCard from '@/components/card/StudySetCard';

interface IStudySetCarouselProps {
    title: string;
    sets: {
        id: number;
        name: string;
        cards: number;
        author: {
            name: string;
            avatar: string;
        }
    }[];
    isTop: boolean;
}

const StudySetCarousel = ({
    title,
    sets,
    isTop
}: IStudySetCarouselProps) => {
  return (
    <div className={`w-full ${isTop ? "" : "mt-10"}`}>
        <h2 className="h2-semibold text-dark-200">{title}</h2>
        <div className="mt-6 flex w-full gap-6 overflow-x-auto">
          {sets.map((item) => <StudySetCard key={item.id} id={item.id} cards={item.cards} name={item.name} authorAvatar={item.author.avatar} authorName={item.author.name} />)}
        </div>
      </div>
  )
}

export default StudySetCarousel