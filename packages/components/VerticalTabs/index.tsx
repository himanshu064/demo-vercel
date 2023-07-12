import classNames from 'classnames';
import React from 'react';

interface Tab {
  id: string;
  name: string;
  onClick?: () => void;
}

interface IProps {
  selected?: string;
  children?: React.ReactNode;
  tabs: Tab[];
}

const VerticalTabs = ({ children, tabs, selected }: IProps) => {
  return (
    <div className='bg-white rounded-lg divide-x flex'>
      <div className='flex flex-col p-6 min-w-[300px]'>
        {tabs.map((tab) => (
          <span
            key={tab.id}
            className={classNames('p-4 cursor-pointer', {
              'bg-[#f6f8fc] rounded-lg font-semibold': selected === tab.id,
            })}
            onClick={tab.onClick}
          >
            {tab.name}
          </span>
        ))}
      </div>
      {children}
    </div>
    // <div
    //   className='md:mt-8 mt-6 lg:mt-8 p-4 flex bg-white'
    //   style={{ boxShadow: '0 3px 25px rgba(0, 0, 0, .2)' }}
    // >
    //   <div className='w-full m-auto sm:flex md:flex lg:flex'>
    //     <div className='float-left md:min-w-[250px] sm:min-w-[200px] h-auto min-w-full w-fit sm:border-r sm:mr-3 sm:border-slate-300 md:border-r md:border-slate-300  md:mr-4 lg:border-r lg:border-slate-300 lg:mr-5 border-r-none mr-0 border-slate-300'>
    //       {tabs.map((tab) => (
    //         <button
    //           className={`w-full ${
    //             selected === tab.id ? 'active font-extrabold bg-[#f6f8fc]' : ''
    //           } p-3 hover:font-extrabold focus:font-extrabold hover:bg-[#f1f5fa] focus:bg-[#f6f8fc] justify-start flex text-base`}
    //           key={tab.id}
    //           onClick={tab.onClick}
    //         >
    //           {tab.name}
    //         </button>
    //       ))}
    //     </div>

    //     <div className='float-left w-full h-full !min-h-[671px] !relative !pb-24'>
    //       {children}
    //     </div>
    //   </div>
    // </div>
  );
};

export default VerticalTabs;
