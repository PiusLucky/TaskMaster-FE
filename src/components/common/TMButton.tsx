import React, { forwardRef } from 'react';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

type MintButtonProps = {
  text: string;
  isLoading?: boolean;
  action?: () => void;
  isSubmitable?: boolean;
  disabled?: boolean;
  width?: 'FULL_WIDTH' | string;
  dataLoadingText?: string;
  variant?: 'PRIMARY' | 'SECONDARY';
  classes?: string;
  iconRoute?: string;
  iconComponent?: React.ReactElement;
};

const MintButton = forwardRef<HTMLButtonElement, MintButtonProps>(
  (
    {
      text,
      isLoading = false,
      action,
      disabled = false,
      isSubmitable,
      width,
      dataLoadingText = 'Please wait ...',
      variant = 'PRIMARY',
      classes,
      iconRoute,
      iconComponent,
    },
    ref,
  ) => {
    const propWidth =
      width === 'FULL_WIDTH' ? 'w-full' : width ? width : 'w-[245px]';

    const isSecondaryVariant = variant !== 'PRIMARY';

    return !isLoading ? (
      <Button
        className={`${
          isSecondaryVariant
            ? ' text-primary border-[1px] border-white'
            : 'bg-primary'
        } text-white shadow-xl ${propWidth} md:${propWidth} md:h-[56px] select-none rounded-[12px]  ${classes}`}
        onClick={action}
        type={isSubmitable ? 'submit' : 'button'}
        ref={ref}
        disabled={disabled}
      >
        {iconRoute && (
          <img src={iconRoute} alt='Button icon' className='w-4 h-4' />
        )}
        {iconRoute && <span>&nbsp;</span>}
        {iconComponent}
        {iconComponent && <span>&nbsp;</span>}
        {text}
      </Button>
    ) : (
      <Button
        className={`bg-primary text-white ${propWidth} md:${propWidth} md:h-[56px] select-none rounded-[12px] cursor-not-allowed ${
          classes ? classes : ''
        }`}
        ref={ref}
        disabled
      >
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        {dataLoadingText}
      </Button>
    );
  },
);

// Assign a display name to your component
MintButton.displayName = 'TaskMasterButton';

export default MintButton;
