'use client';

import { ATOMS } from '@/api/atoms';
import { axiosSuccessDefault } from '@/api/jotaiDefaultValues';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAtom } from 'jotai';

export function SuccessModal() {
  const [success, setSuccess] = useAtom(ATOMS.axiosSuccess);
  return (
    <Dialog
      open={success.successOpenState}
      onOpenChange={() => setSuccess(axiosSuccessDefault)}
    >
      <DialogContent className='sm:max-w-[40rem] animate-in slide-in-from-bottom-48 !backdrop-blur-none'>
        <div className='flex flex-col items-center mb-8'>
          <div>
            <img
              src='/images/circle_check.png'
              alt='Success check icon'
              className='w-[5rem] md:w-[9rem]'
            />
          </div>
          <p className='text-primary font-bold text-[1.2rem] md:text-[2rem]'>
            Success
          </p>
          <p className='mt-2 text-center'>{success.successMessage}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
