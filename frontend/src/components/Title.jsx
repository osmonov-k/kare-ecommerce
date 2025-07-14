import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div
      className="inline-flex gap-2 items-center mb-3"
      aria-label={`${text1} ${text2}`}
    >
      <h2 className="text-gray-500 m-0">
        {text1} <span className="text-gray-700 font-medium">{text2}</span>
      </h2>
      <span
        className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"
        aria-hidden="true"
      />
    </div>
  );
};

export default Title;
