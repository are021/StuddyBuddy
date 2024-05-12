import CardsSliderCarousel from "@/components/shared/carousel/CardsSliderCarousel";
import { getStudySet } from "@/lib/actions/studyset.action";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export interface IParamsProps {
  params: { id: string };
}

const SetPage = async ({ params }: IParamsProps) => {
  const data = await getStudySet({
    studySetId: parseInt(params.id),
  });

  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row md:justify-between">
        <h1 className="h1-bold text-dark-100">{data?.name}</h1>
        <Link href={`/sets/${params.id}/quiz`}>
          <Button className="flex w-[200px] gap-2 rounded-xl bg-primary-500 text-dark-100">
            <Image
              src="/assets/icons/stars.svg"
              width={20}
              height={20}
              alt="stars"
            />
            <p className="paragraph-medium">Generate Quiz</p>
          </Button>
        </Link>
      </div>
      <CardsSliderCarousel cards={data?.flashcards || []} />
      <div className="mt-10 flex flex-col gap-4">
        {data?.flashcards.map((item: any) => (
          <div
            className="card-wrapper flex h-fit w-full flex-col gap-5 rounded-xl p-6 lg:grid lg:grid-cols-7 lg:gap-4"
            key={item.id}
          >
            <div className="col-span-2 flex items-center">
              <p className="base-bold">{item.term}</p>
            </div>

            <div className="col-span-5 flex items-center">
              <p className="body-regular">{item.definition}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SetPage;
