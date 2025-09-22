import React from "react";

interface InteractionData {
  name: string;
  numbers: string | number;
  icon: React.ReactNode;
}

interface CardProps {
  data: InteractionData;
}

const InteractionCard: React.FC<CardProps> = ({ data }) => {
  return (
    <article
      className="flex flex-col sm:flex-row justify-between w-full bg-white rounded-[12px] p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
      aria-label={`${data.name} card`}
    >
      <div className="flex flex-col gap-2 mb-3 sm:mb-0">
        <span className="font-outfit font-semibold text-[16px] text-gray-700 sm:text-[14px]">
          {data.name}
        </span>
        <h2 className="font-outfit font-bold text-[20px] text-black sm:text-[18px]">
          {data.numbers}
        </h2>
      </div>
      <div className="flex justify-start sm:justify-center items-center">
        <div
          className="flex items-center justify-center p-2 rounded-[6px] bg-gray-100 w-12 h-12 sm:w-10 sm:h-10"
          aria-hidden="true"
        >
          {data.icon}
        </div>
      </div>
    </article>
  );
};

export default InteractionCard;
