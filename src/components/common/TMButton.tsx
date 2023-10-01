import React, { forwardRef } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type TMButtonProps = {
  text: string;
  isLoading?: boolean;
  action?: () => void;
  isSubmitable?: boolean;
  disabled?: boolean;
  width?: "FULL_WIDTH" | string;
  dataLoadingText?: string;
  variant?: "PRIMARY" | "SECONDARY";
  classes?: string;
  iconRoute?: string;
  showTextBeforeIcon?: boolean;
  iconComponent?: React.ReactElement;
};

const TMButton = forwardRef<HTMLButtonElement, TMButtonProps>(
  (
    {
      text,
      isLoading = false,
      action,
      disabled = false,
      isSubmitable,
      width,
      dataLoadingText = "Please wait ...",
      variant = "PRIMARY",
      classes,
      iconRoute,
      iconComponent,
      showTextBeforeIcon,
    },
    ref
  ) => {
    const propWidth =
      width === "FULL_WIDTH" ? "w-full" : width ? width : "w-[245px]";

    const isSecondaryVariant = variant !== "PRIMARY";

    return !isLoading ? (
      <Button
        className={`${
          isSecondaryVariant
            ? " text-primary border-[1px] border-white"
            : "bg-primary"
        } text-white shadow-xl ${propWidth} md:${propWidth} md:h-[56px] select-none rounded-[12px]  ${classes}`}
        onClick={action}
        type={isSubmitable ? "submit" : "button"}
        ref={ref}
        disabled={disabled}
      >
        {showTextBeforeIcon ? (
          <div className="flex gap-2 items-center">
            {text}
            {iconRoute && (
              <img
                src={iconRoute}
                alt="Button icon"
                className="w-[1.375rem] h-[1.375rem]"
              />
            )}
            {iconRoute && <span>&nbsp;</span>}
            {iconComponent}
            {iconComponent && <span>&nbsp;</span>}
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            {iconRoute && (
              <img
                src={iconRoute}
                alt="Button icon"
                className="w-[1.375rem] h-[1.375rem]"
              />
            )}
            {iconRoute && <span>&nbsp;</span>}
            {iconComponent}
            {iconComponent && <span>&nbsp;</span>}
            {text}
          </div>
        )}
      </Button>
    ) : (
      <Button
        className={`bg-primary text-white ${propWidth} md:${propWidth} md:h-[56px] select-none rounded-[12px] cursor-not-allowed ${
          classes ? classes : ""
        }`}
        ref={ref}
        disabled
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {dataLoadingText}
      </Button>
    );
  }
);

// Assign a display name to your component
TMButton.displayName = "TaskMasterButton";

export default TMButton;
