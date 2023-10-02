import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCallback, useEffect, useState } from "react";
import { apiClient } from "@/api";
import apiResources from "@/api/resources";
import { useSetAtom } from "jotai";
import { ATOMS } from "@/api/atoms";
import TMButton from "../common/TMButton";
import * as z from "zod";

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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryType, PriorityType } from "@/lib/enum";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn, objectToUri } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ITaskList } from "@/types/global-types";
import { TMEmitter } from "@/lib/eventEmitter";
import { FILTER_EVENT } from "@/lib/events";

function formatDate(inputDateString: string) {
  const inputDate = new Date(inputDateString);
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are 0-based
  const day = inputDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const formSchema = z.object({
  category: z.string().optional(),
  priority: z.string().optional(),
  dueDate: z.date().optional(),
});

//Function starts here...
export function FilterTaskModal() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [actionButtonLoading, setActionButtonLoading] = useState(false);
  const setError = useSetAtom(ATOMS.axiosError);
  const toggleOpenModal = () => {
    setOpen(!open);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      priority: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setActionButtonLoading(true);
    try {
      const { category, priority, dueDate } = values;

      const uriQuery = {
        ...(category && {
          category: category ? category : undefined,
        }),
        ...(priority && {
          priority: priority ? priority : undefined,
        }),

        ...(dueDate && {
          dueDate: dueDate ? formatDate(dueDate?.toString()) : undefined,
        }),
      };

      const taskList = await apiClient.get<ITaskList>(
        apiResources.task,
        `/tasks?${objectToUri(uriQuery)}`,
        setError,
      );

      if (taskList) {
        TMEmitter.emit(FILTER_EVENT, { taskList });
        postActionCleanup();
      }

      setActionButtonLoading(false);
    } catch (err) {
      setActionButtonLoading(false);
    }
  }

  const postActionCleanup = () => {
    //Close modal
    toggleOpenModal();

    // Reset input
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={() => toggleOpenModal()}>
      <DialogTrigger asChild>
        <TMButton
          text={"Filter"}
          iconRoute="/svgs/filter.svg"
          classes="w-[8.06rem] shadow-none !h-[3.37rem] rounded-[0.625rem] bg-white border border-[#000] text-[#000] hover:bg-white"
          action={() => toggleOpenModal()}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60rem] max-h-[500px] md:max-h-full overflow-y-auto pt-8">
        <div>
          <p className="text-[#333] text-[1rem] font-[600] mb-[1.2rem]">
            Filter Tasks
          </p>
          <section>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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

                <TMButton
                  text={"Apply filter"}
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
