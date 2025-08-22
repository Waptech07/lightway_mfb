import React from 'react'
import { TbCurrencyNaira } from 'react-icons/tb'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BsPencilSquare } from 'react-icons/bs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
const UpdateDialog = ({ openDialog, setOpenDialog, user }: { setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, openDialog: boolean, user: any }): React.JSX.Element => {
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}
        >
            <DialogContent className='w-100 flex gap-8 flex-col' showCloseButton={false}
                onOpenAutoFocus={(e) => {
                    // Ensure dialog doesn't have aria-hidden when focused
                    if (e.currentTarget) {
                        const dialog = (e.currentTarget as Element).closest('[role="dialog"]');
                        if (dialog && dialog.hasAttribute('aria-hidden')) {
                            dialog.removeAttribute('aria-hidden');
                        }
                    }
                }}
            >
                <DialogHeader>
                    <div className="rounded-full w-min p-2 bg-[rgba(238,239,254,1)]">
                        <div className="rounded-full w-min p-2 bg-[rgba(215,216,242,1)]">
                            <BsPencilSquare className='text-primary text-xl' />
                        </div></div>
                    <DialogTitle className='text-gray-900 text-2xl font-medium'>Update Recipient</DialogTitle>

                    <DialogDescription className='sr-only'>Please check the detail you want to</DialogDescription>
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
                            <TbCurrencyNaira className='h-4 w-5 text-black' />
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
                            <Button className='bg-gray-200 w-40 py-2 rounded-md text-sm font-semibold text-primary hover:bg-gray-300'>Cancel</Button>
                        </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default UpdateDialog