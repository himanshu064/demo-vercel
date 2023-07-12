import React, { useMemo } from 'react';
import { Table } from '@lantern/components';
import { LiaFileDownloadSolid } from 'react-icons/lia';
import { ColumnDef } from '@tanstack/react-table';

type Report = {
  date: string;
  link: string;
};

const data: Report[] = [
  {
    date: 'March 2021',
    link: 'https://lantern.finance/download/earnings/2023-06-01.csv',
  },
  {
    date: 'April 2022',
    link: 'https://lantern.finance/download/earnings/2023-05-01.csv',
  },
  {
    date: 'May 2023',
    link: 'https://lantern.finance/download/earnings/2023-04-01.csv',
  },
  {
    date: 'June 2024',
    link: 'https://lantern.finance/download/earnings/2023-03-01.csv',
  },
];

const ReportsTab = () => {
  const years = [2021, 2022, 2023, 2024];
  const columns = useMemo<Array<ColumnDef<Report>>>(
    () => [
      {
        accessorKey: 'date',
        header: `Eearnings Statements`,
      },
      {
        accessorKey: 'link',
        header: '',
        cell: (props) => {
          return (
            <button className='text-success-blue-500 ml-auto'>
              <LiaFileDownloadSolid size={18} />
            </button>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <div className='w-full p-2 md:mt-0 sm:mt-0 mt-10 lg:mt-0'>
        <div className='flex items-center mb-4 justify-between'>
          <div>
            <h2 className='text-xl font-semibold'>Reports</h2>
          </div>
          <div>
            <select
              defaultValue='2023'
              className='border px-4 py-2 rounded rounded-xs'
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Table name='reports' columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default ReportsTab;
