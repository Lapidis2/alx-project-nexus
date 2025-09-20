"use client";

import React from "react";

const LoadingFrame: React.FC = () => {
  return (
    <article
      role="status"
      aria-label="Loading product..."
      className="flex flex-col w-full gap-3 animate-pulse"
    >

      <div className="bg-gray-100 w-full h-32 sm:h-48 md:h-60 lg:h-48 xl:h-[30vh] rounded-xl" />


      <div className="flex flex-col gap-2 pl-2 pb-2">
   
        <span className="bg-gray-100 rounded-full h-4 w-36" />

        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-col gap-2">
     
            <span className="bg-gray-100 rounded-full h-5 w-48" />
          
            <span className="bg-gray-100 rounded-full h-4 w-60" />
          </div>

          <div className="h-10 w-10 bg-gray-100 rounded-lg" />
        </div>
      </div>
    </article>
  );
};

export default LoadingFrame;
