"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import TMButton from "../common/TMButton";
import { TaskModel } from "../modals/TaskModal";
import { debounce } from "lodash";
import { TMEmitter } from "@/lib/eventEmitter";
import { FilterTaskModal } from "../modals/FilterTaskModal";
import { FILTER_EVENT, SEARCH_EVENT } from "@/lib/events";
import { apiClient } from "@/api";
import { ITaskList } from "@/types/global-types";
import apiResources from "@/api/resources";
import { useSetAtom } from "jotai";
import { ATOMS } from "@/api/atoms";

function TopSection({
  rerenderParentComp,
}: {
  rerenderParentComp: () => void;
}) {
  const [showRemoveFilter, setShowRemoveFilter] = useState(false);
  const setError = useSetAtom(ATOMS.axiosError);
  const debouncedSearch = debounce((value) => {
    TMEmitter.emit(SEARCH_EVENT, value);
  }, 1000);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const fetchTasks = async () => {
    const taskList = await apiClient.get<ITaskList>(
      apiResources.task,
      `/tasks`,
      setError
    );

    const taskObj = {
      ignoreRemoveAction: true,
      taskList: taskList,
    };

    TMEmitter.emit(FILTER_EVENT, taskObj);
  };

  const resetShowRemoveFilter = async () => {
    await fetchTasks();
    setShowRemoveFilter(false);
  };

  useEffect(() => {
    //Register the event listener
    TMEmitter.on(FILTER_EVENT, async (data: any) => {
      if (!data?.ignoreRemoveAction) setShowRemoveFilter(true);
    });
  }, []);

  return (
    <div>
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
            <FilterTaskModal />
          </div>
          <div>
            <TaskModel isCreate rerenderParentComp={rerenderParentComp} />
          </div>
        </div>
      </div>
      {showRemoveFilter ? (
        <div className="mt-4">
          <TMButton
            iconRoute="/svgs/clear.svg"
            text="Reset filter"
            classes="w-[10rem] !h-[2rem] bg-[#e9081580]"
            action={resetShowRemoveFilter}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default TopSection;
