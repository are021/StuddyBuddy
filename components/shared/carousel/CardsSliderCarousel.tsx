"use client";

import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Keyboard, Pagination, Navigation } from "swiper/modules";
import SliderCard from "@/components/card/SliderCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ICardsSliderCarouselProps {
  cards: {
    id: number;
    term: string;
    definition: string;
  }[];
}

const CardsSliderCarousel = ({ cards }: ICardsSliderCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="mt-10">
      <p className="paragraph-regular text-dark-200">
        Click the flashcards to view the definition.
      </p>
      <Swiper
        navigation={true}
        direction="horizontal"
        keyboard={{
          enabled: true,
        }}
        pagination={{
          enabled: true,
        }}
        modules={[Keyboard, Pagination, Navigation]}
        className="mt-2"
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.activeIndex);
        }}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id} className="rounded-xl bg-light-900">
            <SliderCard term={card.term} definition={card.definition} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-6 flex w-full flex-col items-center">
        <Progress
          value={Math.round(((currentSlide + 1) / cards.length) * 100)}
          className="w-full bg-light-700 fill-primary-500"
        />
        <Badge className="mt-4 bg-light-850">
          <p className="base-medium">
            {currentSlide + 1} / {cards.length}
          </p>
        </Badge>
      </div>
    </div>
  );
};

export default CardsSliderCarousel;
