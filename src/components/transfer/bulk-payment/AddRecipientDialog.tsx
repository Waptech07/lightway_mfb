
import { Label } from '@/components/ui/label'
import { TbCurrencyNaira } from 'react-icons/tb'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { BsPencilSquare } from 'react-icons/bs'
import { Input } from '../../ui/input'
import type React from 'react'
import { PiHash } from 'react-icons/pi'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { LiaUser } from 'react-icons/lia'
const AddRecipientDialog = ({ openDialog, setOpenDialog, user }: { setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, openDialog: boolean, user: any }): React.JSX.Element => {
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog} >
            <DialogContent className='w-100 flex gap-8 flex-col' showCloseButton={false}>
                <DialogHeader>
                    <div className="rounded-full w-min p-2 bg-[rgba(238,239,254,1)]">
                        <div className="rounded-full w-min p-2 bg-[rgba(215,216,242,1)]">
                            <LiaUser className='text-primary text-xl' />
                        </div></div>
                    <DialogTitle className='text-gray-900 text-2xl font-medium'>Add Recipient</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <Label className="" htmlFor='receiving-account'>Receiving Account</Label>
                        <div className="relative h-10 flex items-center">
                            <span className='absolute  text-muted-foreground left-2'>
                                <PiHash className='h-4 w-5' />
                            </span>
                            <Input type="number" placeholder='Enter an Amount' id='receiving-account' className='pl-8 rounded-lg max-mdPhone:text-sm' />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="" htmlFor='account-name'>Account name</Label>
                        <div className="relative h-10 flex items-center">
                            <span className='absolute  text-muted-foreground left-2'>
                                <LiaUser className='h-4 w-5' />
                            </span>
                            <Input type="number" placeholder='Enoobong Nseabasi George' id='account-name' className='bg-[rgba(204,204,204,1)] text-black pl-8 rounded-lg max-mdPhone:text-sm' />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="" htmlFor='amount'>Amount</Label>
                        <div className="relative h-10 flex items-center">
                            <span className='absolute  text-muted-foreground left-2'>
                                <TbCurrencyNaira className='h-4 w-5' />
                            </span>
                            <Input type="number" placeholder='Enter the amount you want to send' id='amount' className='pl-8 rounded-lg max-mdPhone:text-sm' />
                        </div>

                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="" htmlFor='naration'>Narration</Label>
                        <div className="relative h-10 flex items-center">
                            <span className='absolute  text-muted-foreground left-2'>
                                <IoIosInformationCircleOutline className='h-4 w-5' />
                            </span>
                            <Input type="text" placeholder='Enter your narration' id='naration' className='max-mdPhone:text-sm pl-8 rounded-lg' />
                        </div>
                    </div>
                </div>
               <DialogFooter>
                               <div className='flex w-full gap-2 justify-center'>
                                   <Button className=' w-40 py-2 rounded-md text-sm font-semibold text-white'>
                                       Add to Teansfer Recipients
                                   </Button>
                                   <DialogClose asChild>
                                       <Button className='bg-gray-200 w-40 py-2 rounded-md text-sm font-semibold text-primary hover:bg-gray-300'>Cancel</Button>
                                   </DialogClose>
                               </div>
           
           
                           </DialogFooter>
            </DialogContent></Dialog>)
}

export default AddRecipientDialog