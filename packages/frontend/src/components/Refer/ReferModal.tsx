import React from 'react';
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTrigger,
  Image,
  CopiableInput,
} from '@lantern/components';
import logo from '../../assets/illustration.png';
import { notifySuccess } from '../../helpers/toaster';

export const Refer = () => {
  const link = 'https://lantern.finance/share/387dhgb37f';

  return (
    <>
      <DialogHeader>Refer a friend</DialogHeader>
      <Image className='mt-6 w-full' src={logo} alt='Lantern Finance' />
      <div className='py-8 text-center'>
        <h2 className='text-2xl font-medium'>Refer friends and get $15!</h2>
        <p className='text-muted-900 text-sm max-w-[350px] mx-auto mt-3'>
          Get $15 in the crypto of your choice when your friend trades over
          $100.
        </p>
      </div>
      <CopiableInput
        label='Referal link'
        value={link}
        onCopy={() => notifySuccess('Copied to clipboard')}
      />
    </>
  );
};

const ReferModal = ({ children }: { children: React.ReactNode }) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent>
      <Refer />
    </DialogContent>
  </Dialog>
);

export default ReferModal;
