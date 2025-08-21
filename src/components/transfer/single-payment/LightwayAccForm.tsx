import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { TbCurrencyNaira } from "react-icons/tb";
import { LuMessageSquareText } from "react-icons/lu";
import { LiaUser } from "react-icons/lia";
import { Button } from '@/components/ui/button';
import ConfirmPaymentDialog from './ConfirmPaymentDialog';
const LightwayAccForm = (): React.JSX.Element => {
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
        <form className="flex flex-col gap-4 max-mdLap:w-full min-w-96 max-mdPhone:min-w-full">
            <div className="flex flex-col gap-2">
                <Label className="" htmlFor='receiving-account'>Receiving Account</Label>
                <div className="relative h-10 flex items-center">
                    <span className='absolute  text-muted-foreground left-2'>
                        <LiaUser className='h-4 w-5' />
                    </span>
                    <Input type="number" placeholder='Enter an Amount' id='receiving-account' className='pl-8 rounded-lg max-mdPhone:text-sm' />
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
                <Button className='w-40 mt-1 text-sm font-normal h-8'>
                    Select Beneficiary
                </Button>
            </div>
            <div className="flex flex-col gap-2">
                <Label className="" htmlFor='naration'>Narration</Label>
                <div className="relative h-10 flex items-center">
                    <span className='absolute  text-muted-foreground left-2'>
                        <LuMessageSquareText className='h-4 w-5' />
                    </span>
                    <Input type="text" placeholder='Enter your narration' id='naration' className='max-mdPhone:text-sm pl-8 rounded-lg' />
                </div>

            </div>
            <Button type='button' className='w-50 mt-4 text-sm font-normal h-10' onClick={() => setOpenConfirmDialog(true)}>
                Confirm Transaction
            </Button>
            <ConfirmPaymentDialog setOpenDialog={setOpenConfirmDialog} openDialog={openConfirmDialog} isOtherBank={false} bankTransferData={bankTransferData} />

        </form>

    )
}

export default LightwayAccForm