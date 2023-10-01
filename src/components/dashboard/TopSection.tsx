"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import TMButton from "../common/TMButton";
import { TaskModel } from "../modals/TaskModal";
import { debounce } from "lodash";
import { SEARCH_EVENT, TMEmitter } from "@/lib/events";

function TopSection({
  rerenderParentComp,
}: {
  rerenderParentComp: () => void;
}) {
  const debouncedSearch = debounce((value) => {
    TMEmitter.emit(SEARCH_EVENT, value);
  }, 1000);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="flex justify-between flex-col  gap-4 md:flex-row">
      <div className="flex-grow max-w-[500px]">
        <div className="relative">
          <div>
            <Input
              className="pl-[2.5rem] focus:!ring-primary h-[3.125rem]"
              placeholder="Search"
              onChange={onChange}
            />
            <div className="cursor-pointer absolute w-[2.25rem] h-[1.25rem] rounded-[0.5rem] flex justify-center items-center font-bold top-[.8rem] left-1">
              <img src="/svgs/search.svg" alt="search icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 md:gap-[3.19rem]">
        <div>
          <TMButton
            text={"Filter"}
            iconRoute="/svgs/filter.svg"
            classes="w-[8.06rem] shadow-none !h-[3.37rem] rounded-[0.625rem] bg-white border border-[#000] text-[#000] hover:bg-white"
          />
        </div>
        <div>
          <TaskModel isCreate rerenderParentComp={rerenderParentComp} />
        </div>
      </div>
    </div>
  );
}

export default TopSection;
