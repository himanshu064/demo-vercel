import React from 'react'
interface IEmptytableProps {
    name:string;
}
const EnptyTable = ({ name }: IEmptytableProps) => {
 return (
   <h3 className='flex justify-center items-center'>
     No Data for {name} found!
   </h3>
 );
};
export default EnptyTable;