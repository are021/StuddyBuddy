import { useState } from "react";

interface ISliderCardProps {
  term: string;
  definition: string;
}

const SliderCard = ({ term, definition }: ISliderCardProps) => {
  const [isFlipped, setisFlipped] = useState(false);

  return (
    <div
      className="flex-center max-h-[300px] min-h-[300px] cursor-pointer flex-col rounded-xl bg-light-900 px-10 py-6 shadow-md transition-transform"
      onClick={() => setisFlipped((prev) => !prev)}
    >
      <div className="flex flex-col items-center overflow-y-auto">
        {isFlipped ? (
          <>
            <p className="base-medium text-dark-200">Definition:</p>
            <p className="paragraph-regular text-center text-dark-200">
              {definition}
            </p>
          </>
        ) : (
          <>
            <p className="base-medium text-dark-200">Term:</p>
            <p className="paragraph-regular text-center text-dark-200">
              {term}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SliderCard;
