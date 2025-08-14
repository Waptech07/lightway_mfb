import React from 'react'
import bg from "../../assets/dashboard-balance.png"
import { PiEyeSlash } from "react-icons/pi";
import { FaRegCopy } from "react-icons/fa6";
const DashBalance = (): React.JSX.Element => {
  return (
    <div className="w-[462px] font-sf-pro border-2 border-primary/30 rounded-xl p-4  flex flex-col gap-10 " style={{ backgroundImage: `url(${bg})` }}>
      <div className="flex justify-between">
        <div className="">
          <h3 className='text-sm font-normal'>Available Balance</h3>
          <p className='font-bold text-3xl flex items-center'>
            <span>₦</span>
            50,999.00
            <span><PiEyeSlash className='text-primary/70 h-4.5 w-5' /></span>
          </p>
        </div>
        {/* border-red border-2 */}
        <div className="bg-primary/60 rounded-lg inline-flex gap-1 items-center h-10 p-1 ">
          <FaRegCopy className='text-white h-4.5 w-5 ' />
          <p className='bg-white text-black   px-1.5 py-1 rounded-t-md  rounded-b-md rounded-r-[6px] rounded-l-[6px]  '>3115679989</p>
        </div>
      </div>
      <div className="">
        <div className="flex justify-between">
          <p>Ledger Balance</p>
          <p className='text-red'>Blocked Balance</p>
        </div>
        <div className="flex justify-between">
          <p className='text-xl font-medium'>₦50,899.00</p>
          <p className='text-xl font-medium text-red'>₦5,999.00</p>
        </div>
      </div>

    </div>
  )
}


export default DashBalance