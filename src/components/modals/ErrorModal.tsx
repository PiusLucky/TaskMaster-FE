'use client';

import { ATOMS } from '@/api/atoms';
import { axiosErrorDefault } from '@/api/jotaiDefaultValues';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAtom } from 'jotai';

export function ErrorModal() {
  const [error, setError] = useAtom(ATOMS.axiosError);
  return (
    <Dialog
      open={error.errorOpenState}
      onOpenChange={() => setError(axiosErrorDefault)}
    >
      <DialogContent className='sm:max-w-[40rem] animate-in slide-in-from-bottom-48 !backdrop-blur-none'>
        <div className='flex flex-col items-center mb-8'>
          <div>
            <img
              src='/images/exclamation_circle.png'
              alt='Eclamation check icon'
              className='w-[5rem] md:w-[9rem]'
            />
          </div>
          <p className='text-[#BD8728] font-bold text-[1.2rem] md:text-[2rem]'>
            Error ({error.statusCode})
          </p>
          <p className='mt-2 text-center'>{error.errorMessage}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
