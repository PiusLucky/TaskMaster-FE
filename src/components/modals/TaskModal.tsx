import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCallback, useEffect, useState } from "react";
import { apiClient } from "@/api";
import apiResources from "@/api/resources";
import { useSetAtom } from "jotai";
import { ATOMS } from "@/api/atoms";
import TMButton from "../common/TMButton";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryType, PriorityType } from "@/lib/enum";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Task } from "@/types/global-types";

function formatDate(inputDateString: string) {
  const inputDate = new Date(inputDateString);
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are 0-based
  const day = inputDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters",
    })
    .max(255, {
      message: "Title must be at most 255 characters",
    }),
  description: z.string().min(5, {
    message: "Description must be at least 10 characters",
  }),
  category: z.string().min(1, {
    message: "Category is required",
  }),
  priority: z.string().min(1, {
    message: "Priority is required",
  }),
  dueDate: z.date({
    required_error: "Due date is required.",
  }),
});

export function TaskModel({
  rerenderParentComp,
  isCreate,
  task,
}: {
  rerenderParentComp: () => void;
  isCreate: boolean;
  task?: Task;
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [actionButtonLoading, setActionButtonLoading] = useState(false);
  const setError = useSetAtom(ATOMS.axiosError);
  const setSuccess = useSetAtom(ATOMS.axiosSuccess);
  const toggleOpenModal = () => {
    setOpen(!open);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      category: task?.category || "",
      priority: task?.priority || "",
      dueDate: task?.dueDate ? new Date(task?.dueDate) : new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setActionButtonLoading(true);
    try {
      const { title, description, category, priority, dueDate } = values;

      if (isCreate) {
        const { data } = await apiClient.post(
          apiResources.task,
          "/tasks",
          {
            title,
            description,
            category,
            priority,
            dueDate: formatDate(dueDate.toString()),
          },
          setError,
          setSuccess,
        );

        if (data) {
          postActionCleanup();
        }
      } else {
        const { data } = await apiClient.put(
          apiResources.task,
          `/tasks/${task?.id}`,
          {
            title,
            description,
            category,
            priority,
            dueDate: formatDate(dueDate.toString()),
          },
          setError,
          setSuccess,
        );

        if (data) {
          postActionCleanup();
        }
      }

      setActionButtonLoading(false);
    } catch (err) {
      setActionButtonLoading(false);
    }
  }

  const postActionCleanup = () => {
    // Refetch/Refresh parent component
    rerenderParentComp();

    //Close modal
    toggleOpenModal();

    // Reset input
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={() => toggleOpenModal()}>
      <DialogTrigger asChild>
        {isCreate ? (
          <TMButton
            text={"Add New Task"}
            classes="w-[9.125rem] shadow-none !h-[3.37rem] rounded-[0.625rem]"
            action={() => toggleOpenModal()}
          />
        ) : (
          <div
            className="flex gap-[0.4rem] cursor-pointer"
            onClick={() => toggleOpenModal()}
          >
            <img src="/svgs/pencil.svg" alt="Pencil icon" />
            <p>Edit</p>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60rem] max-h-[500px] md:max-h-full overflow-y-auto pt-8">
        <div>
          <p className="text-[#333] text-[1rem] font-[600] mb-[1.2rem]">
            {isCreate ? "Create" : "Update"} New Task
          </p>
          <section>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl className="relative">
                        <div>
                          <Input
                            placeholder="Enter Title"
                            {...field}
                            className=" focus:!ring-primary h-[3.125rem]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="focus:!ring-primary">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value={CategoryType.Work}>
                                Work
                              </SelectItem>
                              <SelectItem value={CategoryType.Studies}>
                                Studies
                              </SelectItem>
                              <SelectItem value={CategoryType.Fun}>
                                Fun
                              </SelectItem>
                              <SelectItem value={CategoryType.Other}>
                                Other
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Priority  & DueDate*/}
                <div className="flex md:items-center md:justify-between w-full gap-8 md:gap-16 flex-col md:flex-row">
                  <div className="flex-grow">
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="focus:!ring-primary">
                                <SelectValue placeholder="Select Priority" />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value={PriorityType.High}>
                                    High
                                  </SelectItem>
                                  <SelectItem value={PriorityType.Medium}>
                                    Medium
                                  </SelectItem>
                                  <SelectItem value={PriorityType.Low}>
                                    Low
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex-grow mt-2">
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Due Date</FormLabel>
                          <Popover
                            open={isCalendarOpen}
                            onOpenChange={setIsCalendarOpen}
                          >
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(e) => {
                                  field.onChange(e);
                                  setIsCalendarOpen(false);
                                }}
                                disabled={(date) =>
                                  date <=
                                  new Date(
                                    new Date().setDate(
                                      new Date().getDate() - 1,
                                    ),
                                  )
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <div>
                            <Textarea
                              {...field}
                              placeholder="Enter task description"
                              className="focus:!ring-primary"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <TMButton
                  text={isCreate ? "Create Task" : "Update Task"}
                  isSubmitable
                  width="w-full"
                  isLoading={actionButtonLoading}
                />
              </form>
            </Form>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
