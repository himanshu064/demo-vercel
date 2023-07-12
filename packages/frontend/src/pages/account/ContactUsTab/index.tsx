import React from 'react';

const ContactUsTab = () => {
  return (
    <div className='p-6'>
      <h2 className='text-xl font-semibold mb-6'>Contact Us</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='bg-primary-200 rounded-lg'>
          <h3 className='text-2xl px-4 py-5 font-semibold'>
            hello@lantern.finance
          </h3>
          <p className='p-4 text-muted-900 text-xs border-t'>
            You will receive a reply to your email within 48 hours (2 days).
          </p>
        </div>
        <div className='bg-primary-200 rounded-lg'>
          <h3 className='text-2xl px-4 py-5 font-semibold'>
            +1 (555) 123-4567
          </h3>
          <p className='p-4 text-muted-900 text-xs border-t'>
            The hours of service are from 9 AM to 9 PM PT (Pacific Time).
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsTab;
