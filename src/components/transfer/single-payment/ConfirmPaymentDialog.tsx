import React from 'react'
import { Label } from '@/components/ui/label'
import { TiWarningOutline } from "react-icons/ti";
import { BiSolidLock } from "react-icons/bi";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { BiTransferAlt } from "react-icons/bi";
import { Input } from '@/components/ui/input'
type ConfirmPaymentDialogPropsType = {
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, openDialog: boolean, isOtherBank: boolean, bankTransferData: {
        field: string;
        value: string;
    }[]
}
const ConfirmPaymentDialog = ({ bankTransferData, openDialog, setOpenDialog, isOtherBank }: ConfirmPaymentDialogPropsType): React.JSX.Element => {
    //   ${isOtherBank && "max-h-[90vh]"} 
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className={`w-120 max-h-[90vh] flex gap-4 flex-col`} showCloseButton={false}>
                <DialogHeader>
                    <div className="rounded-full w-min p-2 bg-[rgba(238,239,254,1)]">
                        <div className="rounded-full w-min p-2 bg-[rgba(215,216,242,1)]">
                            <BiTransferAlt className='text-primary text-xl' />
                        </div>
                    </div>
                    <DialogTitle className='text-gray-900 text-2xl font-medium'>
                        Confirm Transaction
                    </DialogTitle>

                    <DialogDescription className='text-[rgba(140,62,13,1)] text-base font-normal bg-[rgba(252,226,182,1)] py-4 px-4 rounded-lg border-1 border-[rgba(187,167,68,1)] flex items-start gap-2'>

                        <div className="flex-shrink-0 mt-0.5">
                            <TiWarningOutline size={25} />
                        </div>
                        <span className="flex-1"> Before sending funds, please ensure that the recipient's account details is accurate. Always double-check the beneficiary information
                        </span>
                    </DialogDescription>


                </DialogHeader>
                {/* ${isOtherBank && "flex-1 overflow-y-auto"}  */}
                <div className={`flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden`}>
                    {bankTransferData.map((bankTransfer, id) => (
                        <div key={id} className="flex justify-between border-b-1 py-2.5 text-black border-[rgba(221,221,221,1)]">
                            <p className='text-base'>{bankTransfer.field}</p>
                            <p className='font-semibold text-base'>{bankTransfer.value}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    <Label className="" htmlFor='transaction-pin'>Transaction Pin</Label>
                    <div className="relative h-10 flex items-center">
                        <span className='absolute  text-muted-foreground left-2'>
                            <BiSolidLock className='h-4 w-5' />
                        </span>
                        <Input type="number" placeholder='Enter pin' id='transaction-pin' className='pl-8 rounded-lg max-mdPhone:text-sm' />
                    </div>
                </div>
                {/* <p className="text-red-500 text-base">Incorrect Pin</p> */}
                <DialogFooter>

                    <div className='flex w-full gap-2 justify-center'>
                        <Button className=' w-40 py-2 rounded-md text-sm font-semibold text-white'>
                            Confirm Transaction
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

export default ConfirmPaymentDialog