"use client";

import { apiClient } from "@/api";
import { ATOMS } from "@/api/atoms";
import apiResources from "@/api/resources";
import TMPagination from "@/components/common/Pagination";
import EmptyTaskScreen from "@/components/dashboard/EmptyTaskScreen";
import TaskCard from "@/components/dashboard/TaskCard";
import TopSection from "@/components/dashboard/TopSection";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TMEmitter } from "@/lib/eventEmitter";
import { FILTER_EVENT, SEARCH_EVENT } from "@/lib/events";
import { ITaskList } from "@/types/global-types";
import { useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<ITaskList | null>(null);
  const setError = useSetAtom(ATOMS.axiosError);

  const handlePageChange = async (page: number) => {
    const data = await apiClient.get<ITaskList>(
      apiResources.task,
      `/tasks?page=${page}`,
      setError
    );

    setTasks(data);
  };

  const handleSearch = async (searchValue: string) => {
    const data = await apiClient.get<ITaskList>(
      apiResources.task,
      `/tasks?search=${searchValue}`,
      setError
    );

    setTasks(data);
  };

  const handleFilter = async (task: ITaskList) => {
    setTasks(task);
  };

  const handleInitialCall = async () => {
    const data = await apiClient.get<ITaskList>(
      apiResources.task,
      "/tasks",
      setError
    );
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    //Register the event listener
    TMEmitter.on(SEARCH_EVENT, async (searchValue) => {
      await handleSearch(searchValue as string);
    });

    TMEmitter.on(FILTER_EVENT, async (data: any) => {
      await handleFilter(data?.taskList as ITaskList);
    });

    async function fetch() {
      await handleInitialCall();
    }

    fetch();
  }, []);

  return (
    <div className="pl-4 md:pl-[2.5rem] pr-1 md:pr-[2.5rem]">
      <div className="text-[1.5rem] md:text-[1.6rem] font-[500] mt-2 mb-[1.88rem] ">
        Task Dashboard
      </div>
      <TopSection rerenderParentComp={handleInitialCall} />
      <div className="min-h-[70vh] mt-[1.94rem]">
        {loading ? (
          [1, 2, 3].map((_, index) => (
            <div className="flex flex-col gap-4 mb-8" key={index}>
              <Skeleton className="w-[5rem] h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-[10rem] h-4" />
            </div>
          ))
        ) : (
          <div>
            {tasks?.data?.tasks?.length ? (
              tasks?.data?.tasks?.map((task) => (
                <div key={task.id} className="mb-[1.31rem]">
                  <TaskCard
                    task={task}
                    rerenderParentComp={handleInitialCall}
                  />
                </div>
              ))
            ) : (
              <EmptyTaskScreen />
            )}
          </div>
        )}
      </div>
      <div className="mt-[8rem]">
        <Separator />
      </div>

      <div className="mt-[1.25rem]">
        <TMPagination
          onPageChange={handlePageChange}
          totalCount={tasks?.data?.pagination?.total_elements || 0}
          siblingCount={1}
          currentPage={tasks?.data?.pagination?.page || 1}
          pageSize={tasks?.data?.pagination?.limit || 10}
        />
      </div>
    </div>
  );
}

export default Dashboard;
