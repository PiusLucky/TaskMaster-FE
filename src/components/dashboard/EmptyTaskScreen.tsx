import React from "react";

function EmptyTaskScreen() {
  return (
    <div className="flex justify-center flex-col items-center gap-4 p-4">
      <div>
        <img src="/images/big_search_icon.png" alt="Large search icon" />
      </div>
      <div className="text-[#101828] font-[500]">No Task found</div>
      <div className="text-[#667085] text-center">
        You have not created any task, try to add one using the Add New Task
        button above
      </div>
    </div>
  );
}

export default EmptyTaskScreen;
