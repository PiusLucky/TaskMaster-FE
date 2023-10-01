"use client";

import React from "react";
import classnames from "classnames";
import usePagination from "@/hooks/usePagination";
import TMButton from "./TMButton";

interface Props {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const TMPagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  const baseStyles =
    "px-2.5 py-1 flex justify-center items-center rounded-md font-inter text-[0.813rem] bg-white hover:bg-grey-300 border border-neutral-200 select-none cursor-pointer";

  return (
    <div className="flex gap-4 flex-col md:flex-row justify-between items-center">
      <div>
        <TMButton
          iconRoute="/svgs/left_arrow.svg"
          text="Previous"
          action={onPrevious}
          classes={` bg-white text-black border shadow-none border-[#D0D5DD] ${classnames(
            baseStyles,
            {
              hidden: currentPage === 1,
            }
          )}`}
        />
      </div>
      <div className="flex">
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === "DOTS") {
            return (
              <div key={index} className="select-none">
                ...
              </div>
            );
          }
          return (
            <div
              key={index}
              className={` font-bold text-[#667085] border-none   bg-transparent w-[2.5rem] h-[2.5rem] ${classnames(
                baseStyles,
                {
                  "!font-bold !text-[#249756] !bg-[#24975633]":
                    pageNumber === currentPage,
                }
              )} `}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </div>
          );
        })}
      </div>

      <div>
        <TMButton
          iconRoute="/svgs/right_arrow.svg"
          text="Next"
          showTextBeforeIcon
          action={onNext}
          classes={` bg-white text-black border border-[#D0D5DD] shadow-none ${classnames(
            baseStyles,
            {
              hidden: currentPage === lastPage,
            }
          )}`}
        />
      </div>
    </div>
  );
};

export default TMPagination;
