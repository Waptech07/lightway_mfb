import React, { useState } from 'react'
import { GoSearch } from 'react-icons/go'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import formatCurrency from '@/lib/formatCurrency'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { BsPencilSquare } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { BsExclamationCircle } from "react-icons/bs";
import { Label } from '@/components/ui/label'
import { PiHash } from 'react-icons/pi'
import { TbCurrencyNaira } from 'react-icons/tb'
const DeleteDialog = ({ openDialog, setOpenDialog, userId }: { setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, openDialog: boolean, userId: any }) => {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog} >
      <DialogContent className='w-100 flex gap-8 flex-col' showCloseButton={false}>
        <DialogHeader>
          <div className="rounded-full w-min p-2 bg-[rgba(254,243,242,1)]">


            <div className="rounded-full w-min p-2 bg-[rgba(254,228,226,1)]">

              <BsExclamationCircle className='text-red text-xl' />
            </div>  </div>
          <DialogTitle className='text-gray-900 text-lg'>Remove from Recipient List</DialogTitle>
          <DialogDescription className='text-gray-500 text-sm font-normal'>
            Are you sure you want to remove this recipient from this list? You can add them back anytime.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className=''>
          <DialogClose asChild>
            <Button className='bg-gray-200 px-4 py-2 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-300 flex-1'>Cancel</Button>
          </DialogClose>
          <Button className='bg-[rgba(217,45,32,1)] hover:bg-red-500 px-4 p  y-2 rounded-md text-sm font-semibold text-white flex-1'>
            Remove
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
const UpdateDialog = ({ openDialog, setOpenDialog, user }: { setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, openDialog: boolean, user: any }) => {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog} >
      <DialogContent className='w-100 flex gap-8 flex-col' showCloseButton={false}>
        <DialogHeader>
          <div className="rounded-full w-min p-2 bg-[rgba(238,239,254,1)]">
            <div className="rounded-full w-min p-2 bg-[rgba(215,216,242,1)]">
              <BsPencilSquare className='text-blue text-xl' />
            </div></div>
          <DialogTitle className='text-gray-900 text-2xl font-medium'>Update Recipient</DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="flex justify-between border-b-1 py-2.5 text-black border-[rgba(221,221,221,1)]">
            <p className='text-base'>Receiver Account Number</p>
            <p className='font-semibold text-base'>{user.accountNumber}</p>
          </div>
          <div className='flex justify-between border-b-1 py-2.5 text-black border-[rgba(221,221,221,1)]'>
            <p className='text-base'>Receiver Name</p>
            <p className='font-semibold text-base'>{user.name}</p>
          </div>
        </div>

   <div className="flex flex-col gap-2">
                    <Label className="" htmlFor='receiving-account'>Update  Amount</Label>
                    <div className="relative h-10 flex items-center">
                        <span className='absolute  text-muted-foreground left-2'>
                                <TbCurrencyNaira  className='h-4 w-5' />
                        </span>
                        <Input type="number" placeholder='Enter amount' id='receiving-account' className='pl-8 rounded-lg max-mdPhone:text-sm' />
                    </div>
                   
</div>
        <DialogFooter>
          <div className='flex w-full gap-2 justify-center'>
            <Button className=' w-40 py-2 rounded-md text-sm font-semibold text-white'>
            Update
          </Button>
          <DialogClose asChild>
            <Button className='bg-gray-200 w-40 py-2 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-300'>Cancel</Button>
          </DialogClose>
          </div>
          

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
const TransferRecipients = (): React.JSX.Element => {

  const users = [
    {
      name: "Enoobong George",
      initials: "EG", accountNumber: "1234567890", amount: 125000
    },
    {
      name: "Akintade Kemi",
      initials: "AK", accountNumber: "3456789012", amount: 3200075
    },
    {
      name: "Michael Ijeoma",
      initials: "MI", accountNumber: "2345678901", amount: 75000.00
    },
    {
      name: "Chinonso Uche",
      initials: "CU", accountNumber: "4567890123", amount: 150000.25
    },
  ];
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  //  
  return (
    <div className="bg-[rgba(246,246,246,1)] max-lg:w-full max-lg:min-w-full  min-w-[27rem] p-2 flex flex-col gap-2.5 rounded-lg  border-1 ">

      <div className='border-b-1 flex pb-2.5 gap-1'>
        <h2 className='text-base font-semibold'>Transfer Recipients</h2>
        {/* bg-white text-black border-1 border-gray-300 rounded-md px-2 py-1 text-sm */}
        <Badge className='text-xs ml-1 rounded-xl w-7 h-5.5 font-semibold bg-[rgba(255,65,18,1)]'>4</Badge>
      </div>
      <div className="relative h-10 flex items-center">
        <span className='absolute  text-muted-foreground left-2'>
          <GoSearch className='h-4 w-5' />
        </span>
        <Input type="text" placeholder='Search' id='naration' className='bg-white pl-8 rounded-lg' />
      </div>

      <div className='flex flex-col gap-2'>
        {users.map((user, id) => (
          <div
            key={id}
            role="listitem"
            className="flex flex-row items-center justify-between p-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors border-b-1 border-gray-300 last:border-b-0"
          >
            <div className="flex items-center space-x-3 mb-2 sm:mb-0">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10" aria-hidden="true">
                <AvatarFallback
                  className={`bg-primary text-white text-xs sm:text-sm font-medium`}
                >
                  {user.initials}
                </AvatarFallback>
              </Avatar>

              <div className="">
                <p className="text-base max-tab:text-sm  font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p
                  className="text-xs sm:text-sm font-normal"
                >
                  <span className='font-semibold'>
                    {formatCurrency(user.amount)}
                  </span> to <span>
                    {user.accountNumber}
                  </span>
                </p>
              </div>

            </div>
            <div className="buttons flex items-center gap-2">

              <BsPencilSquare className='cursor-pointer text-lg' onClick={() => setOpenUpdateDialog(true)} />
              <IoTrashOutline className='cursor-pointer text-lg text-red-500' onClick={() => {
                setOpenDeleteDialog(true);
              }} />
            </div>
            <UpdateDialog openDialog={openUpdateDialog} setOpenDialog={setOpenUpdateDialog} user={user} />
            {/* UserId might change later */}
            <DeleteDialog openDialog={openDeleteDialog} setOpenDialog={setOpenDeleteDialog} userId={user.accountNumber} />
          </div>))}
      </div>
    </div>
  )
}

export default TransferRecipients