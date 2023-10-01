import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TMButton from "../common/TMButton";
import { useState } from "react";
import { apiClient } from "@/api";
import apiResources from "@/api/resources";
import { ATOMS } from "@/api/atoms";
import { useSetAtom } from "jotai";
import { STATUS_OK } from "@/lib/defaultConfig";

interface IProps {
  title: string;
  taskId: string;
  setIsPopOverOpen: (isPopOverOpen: boolean) => void;
  rerenderFunc: () => void;
}

function DeleteModal({
  title,
  taskId,
  setIsPopOverOpen,
  rerenderFunc,
}: IProps) {
  const [open, setOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const setError = useSetAtom(ATOMS.axiosError);
  const setSuccess = useSetAtom(ATOMS.axiosSuccess);
  const toggleOpenModal = () => {
    setOpen(!open);
  };

  const handleDeleteTask = async () => {
    setIsPopOverOpen(false);
    setIsLoading(true);

    try {
      const {
        meta: { statusCode },
      } = await apiClient.delete(
        apiResources.task,
        `/tasks/${taskId}`,
        setError,
        setSuccess
      );

      if (statusCode === STATUS_OK) {
        rerenderFunc();
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => toggleOpenModal()}>
      <DialogTrigger asChild>
        <div
          className="flex gap-[0.4rem] cursor-pointer text-danger"
          onClick={() => toggleOpenModal()}
        >
          <img src="/svgs/trash.svg" alt="Pencil icon" />
          <p>Delete</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60rem] h-[300px] md:max-h-full overflow-y-auto pt-8">
        <div className="pt-8">
          <div className="font-bold text-center mb-4">
            Are you sure you want to delete this task?
          </div>
          <div className="text-gray-500 mb-8 text-center">{title}</div>
          <div className="flex justify-center gap-[2.19rem]">
            <TMButton
              text="Cancel"
              classes="bg-white hover:bg-white text-black border border-black w-[9rem] !h-[3rem]"
              action={toggleOpenModal}
            />
            <TMButton
              text="Delete Task"
              classes="bg-danger hover:bg-danger text-white w-[9rem] !h-[3rem]"
              isLoading={loading}
              dataLoadingText="Wait..."
              action={handleDeleteTask}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteModal;
