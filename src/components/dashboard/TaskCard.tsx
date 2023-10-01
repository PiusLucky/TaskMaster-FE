"use client";

import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Task, UserData } from "@/types/global-types";
import { capitalizeFirstLetter, getFirstLetters } from "@/lib/utils";
import { TaskModel } from "../modals/TaskModal";
import { apiClient, cookieStorageManager } from "@/api";
import { storageKeys } from "@/api/storageKeys";
import apiResources from "@/api/resources";
import { useSetAtom } from "jotai";
import { ATOMS } from "@/api/atoms";
import { STATUS_OK } from "@/lib/defaultConfig";
import DeleteModal from "../modals/DeleteModal";

function TaskCard({
  task,
  rerenderParentComp,
}: {
  task: Task;
  rerenderParentComp: () => void;
}) {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const setError = useSetAtom(ATOMS.axiosError);
  const setSuccess = useSetAtom(ATOMS.axiosSuccess);
  const user = cookieStorageManager.getItem<UserData>(storageKeys.user);

  return (
    <section className="rounded-[0.75rem] shadow-lg pl-[1.5rem] pr-[1rem] pt-[1.25rem] pb-[1.69rem]">
      <div className="flex justify-between items-center">
        <div>
          <Badge
            className={`bg-[#24975633] hover:bg-[#24975633] text-[#219653] `}
          >
            <span className="">{capitalizeFirstLetter(task.category)}</span>
          </Badge>
        </div>
        <div>
          <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
            <PopoverTrigger>
              <img src="/svgs/three_dot.svg" alt="three dots for action" />
            </PopoverTrigger>
            <PopoverContent>
              <div className="text-[#2C3E50] flex flex-col gap-[0.8rem]">
                <TaskModel
                  rerenderParentComp={rerenderParentComp}
                  isCreate={false}
                  task={task}
                />

                <DeleteModal
                  taskId={task?.id}
                  title={task?.title}
                  setIsPopOverOpen={setIsPopOverOpen}
                  rerenderFunc={rerenderParentComp}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="mt-[0.81rem] pr-2">{task.title}</div>
      <div className="mt-[0.81rem] pr-2 text-gray-500">{task.description}</div>
      <div className="flex gap-[2.5rem] mt-[0.81rem]">
        <div className="flex gap-2 items-center">
          <img src="/svgs/calendar.svg" alt="calendar icon" className="w-4" />
          <p className="text-[#828282] text-[0.75rem]">
            Due Date: {task.dueDate.toString()}
          </p>
        </div>

        <Badge
          className={`bg-[#e9081533] hover:bg-[#e9081533] text-[#FD0404] h-[1.437rem] !w-[150px]`}
        >
          <span className="text-[0.625rem]">
            {capitalizeFirstLetter(task.priority)} priority
          </span>
        </Badge>

        <Avatar className="w-[1.5rem] h-[1.5rem]">
          <AvatarFallback className="text-[.8rem]">
            {getFirstLetters(user?.full_name || "TM")}
          </AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
}

export default TaskCard;
