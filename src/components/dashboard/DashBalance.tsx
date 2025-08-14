import React from 'react'
import bg from "../../assets/dashboard-balance.png"
import { PiEyeSlash } from "react-icons/pi";
import { FaRegCopy } from "react-icons/fa6";
const DashBalance = ():React.JSX.Element => {
  return (
   <div className="font-sf-pro text-left rounded-xl p-4 mt-4" style={{backgroundImage: `url(${bg})`}}>
   <div className="flex">
  <div className="">
      <h3 className='text-sm font-normal'>Available Balance</h3>
      <p className='font-bold text-3xl flex'>
        <span>₦</span> 
        50,999.00
        <span><PiEyeSlash className='text-primary/70'/></span>
        </p>
    </div>
    <div className="bg-primary/60 flex">
<FaRegCopy className='text-white'/>
      <p className='bg-white text-black rounded-md'>3115679989</p>
    </div>
    </div>
    <div className="">
      <div className="flex justify-between">
      <p>Ledger Balance</p>
      <p>Blocked Balance</p>
    </div>
    <div className="flex justify-between">
      <p className='text-xl font-medium'>₦50,899.00</p>
      <p className='text-xl font-medium'>₦5,999.00</p>
    </div>
    </div>
    
   </div>
  )
}

export default DashBalance