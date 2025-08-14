import React from 'react'

const DashboardQA = ({header,details}:{header:string,details:string}):React.JSX.Element => {
  return (
   <div className='font-sf-pro border-2 border-primary/30 rounded-xl py-7 px-6 flex flex-col gap-1 bg-blue-600 text-white'>
    <h3 className='text-base font-bold'>{header}</h3>
    <p className='text-xs font-normal'>{details}</p>
   </div>
  )
}

export default DashboardQA