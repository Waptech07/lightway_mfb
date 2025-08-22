import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from 'lucide-react'
import { RiArrowLeftRightLine } from "react-icons/ri";


const TransactionDialog = ({ openDialog, setOpenDialog, }: {
    openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}): React.JSX.Element => {
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className={`w-120 max-h-[90vh] flex gap-4 flex-col`} showCloseButton={false}>
                <DialogHeader className='bg-primary/70 text-white'>
                    <DialogTitle>
                        Transaction Details
                    </DialogTitle>
                    <X />
                </DialogHeader>
                <DialogDescription className='flex justify-between py-2 px-4 rounded-2xl border-1 border-[rgba(222,222,222,1)]'>
                    <span>
                        <span
                            className="rounded-full w-min p-2 bg-[rgba(254,228,226,1)]">
                            <RiArrowLeftRightLine className='text-red' />
                        </span>
                        <span>
                            <span className='text-base font-medium'>Enoobong George</span>
                            <span className='text-sm font-normal'>Standard Chartered Bank</span>
                        </span>
                    </span>
                    <span className='text-sm font-medium'>₦250,000.00</span>

                </DialogDescription>

                <DialogFooter className='border-1 border-[rgba(222,222,222,1)] rounded-2xl'>
                    <div className="flex justify-between border-b-1 py-2.5 text-black border-[rgba(221,221,221,1)]">
                        <p className='text-base'>Initiated By</p>
                        <p className='font-semibold text-base'></p>
                    </div>
                    <div className='flex justify-between border-b-1 py-2.5 text-black border-[rgba(221,221,221,1)]'>
                        <p className='text-base'>Initiator Email</p>
                        <p className='font-semibold text-base'></p>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TransactionDialog