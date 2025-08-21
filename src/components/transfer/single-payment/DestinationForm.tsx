import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { TbCurrencyNaira } from "react-icons/tb";
import { LuMessageSquareText } from "react-icons/lu";
import { LiaUser } from "react-icons/lia";
import { SelectItem, Select, SelectContent, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import ConfirmPaymentDialog from './ConfirmPaymentDialog';
const DestinationForm = (): React.JSX.Element => {
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const bankTransferData = [
        {
            field: "Sending Account",
            value: "3115679989"
        },
        {
            field: "Account Name",
            value: "Enoobong George"
        },
        {
            field: "Amount",
            value: "₦250,000.00"
        },
        {
            field: "Beneficiary Account",
            value: "0002638989"
        },
        {
            field: "Beneficiary Name",
            value: "Nseabasi George"
        },
    ];
    return (
        <form className="flex flex-col gap-4 pt-9 w-96 max-tab:w-full ">
            <div className="flex flex-col gap-2">
                <Label className="" htmlFor='amount'>Select Destination Account</Label>
                <Select>
                    <SelectTrigger className="w-full relative pl-10  data-[placeholder]:text-muted-foreground  [&_svg:not([class*='text-'])]:text-muted-foreground" >
                        <SelectValue placeholder="Select Destination Account" />
                        <span className='absolute left-2'>
                            <LiaUser className='h-4 w-5' /></span>
                    </SelectTrigger>
                    <SelectContent> <SelectItem value="my-accounts">My Accounts</SelectItem>
                        <SelectItem value="lightway-accounts">Lightway Accounts</SelectItem>
                        <SelectItem value="other-banks">Other Banks</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-2">
                <Label className="" htmlFor='amount'>Amount</Label>
                <div className="relative h-10 flex items-center">
                    <span className='absolute  text-muted-foreground left-2'>
                        <TbCurrencyNaira className='h-4 w-5' />
                    </span>
                    <Input type="number" placeholder='Enter an Amount' id='amount' className='pl-8 rounded-lg' />
                </div>

            </div>
            <div className="flex flex-col gap-2">
                <Label className="" htmlFor='naration'>Narration</Label>
                <div className="relative h-10 flex items-center">
                    <span className='absolute  text-muted-foreground left-2'>
                        <LuMessageSquareText className='h-4 w-5' />
                    </span>
                    <Input type="text" placeholder='Enter your narration' id='naration' className=' pl-8 rounded-lg' />
                </div>

            </div>
            <Button type='button' className='w-50 mt-4 text-sm font-normal h-10' onClick={() => setOpenConfirmDialog(true)}>
                Confirm Transaction
            </Button>
            <ConfirmPaymentDialog setOpenDialog={setOpenConfirmDialog} openDialog={openConfirmDialog} isOtherBank={false} bankTransferData={bankTransferData} />
        </form>
    )
}

export default DestinationForm