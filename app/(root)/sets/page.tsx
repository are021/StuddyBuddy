import { getAllStudySets } from '@/lib/actions/studyset.action'
import React from 'react'

import StudySetCard from '@/components/card/StudySetCard';

const AllSetsPage = async () => {
    const result = await getAllStudySets();

    console.log(result);
  return (
    <>
        <h1 className='h1-semibold'>
            All Study Sets
        </h1>
        <div className='mt-10 flex flex-wrap gap-4'>
            {result?.studySets.length ? result?.studySets.map((item: any) => (
                <StudySetCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    cards={item.cards}
                    authorName={item.author.name}
                    authorAvatar={item.author.avatar}
                />
            )) : (
                <div>
                    <p className='paragraph-regular text-dark-400'>No study sets found</p>
                </div>
            )}
        </div>
    </>
  )
}

export default AllSetsPage