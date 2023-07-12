import React, { useMemo } from 'react';
import { StatusDot, Table } from '@lantern/components';
import { ColumnDef } from '@tanstack/react-table';
interface RefrealType {
  friendName?: string;
  Date?: string;
  amountInUSD?: string;
  amountInETH?: string;
  status: string;
}

const ReferralsTab = () => {
  const columns = useMemo<Array<ColumnDef<RefrealType>>>(
    () => [
      {
        accessorKey: 'friendName',
        header: `Friend's Name`,
      },
      {
        accessorKey: 'Date',
        header: 'Date',
      },
      {
        accessorKey: 'amountInUSD',
        header: 'Amount in USD',
      },
      {
        accessorKey: 'amountInETH',
        header: 'Amount in ETH',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (props) => {
          return (
            <span className='flex items-center justify-center'>
              <StatusDot color='red' />
              <span className='ml-2'>{props.row.original.status}</span>
            </span>
          );
        },
      },
    ],
    []
  );
  const referalData = [
    {
      friendName: 'Albert',
      Date: 'May 12,2022',
      amountInUSD: '$15.00',
      amountInETH: '0,0084',
      status: 'In Progress',
    },
    {
      friendName: 'Albert',
      Date: 'May 12,2022',
      amountInUSD: '$15.00',
      amountInETH: '0,0084',
      status: 'In Progress',
    },
    {
      friendName: 'Albert',
      Date: 'May 12,2022',
      amountInUSD: '$15.00',
      amountInETH: '0,0084',
      status: 'In Progress',
    },
    {
      friendName: 'Albert',
      Date: 'May 12,2022',
      amountInUSD: '$15.00',
      amountInETH: '0,0084',
      status: 'In Progress',
    },
  ];
  return (
    <>
      <div className='w-full p-2 sm:mt-0 mt-10 lg:mt-0'>
        <h3 className='text-lg font-semibold mb-4'>Rewards history</h3>
        <Table columns={columns} data={referalData} name='Refreal table' />
      </div>
    </>
  );
};

export default ReferralsTab;
