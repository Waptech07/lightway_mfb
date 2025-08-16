import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { TbCurrencyNaira } from "react-icons/tb";
import { LuMessageSquareText } from "react-icons/lu";
import { LiaUser } from "react-icons/lia";
import { Button } from '@/components/ui/button';
const LightwayAccForm = ():React.JSX.Element => {
    return (
        <form className="flex flex-col gap-4 w-96">
            <div className="flex flex-col gap-2">
                <Label className="" htmlFor='receiving-account'>Receiving Account</Label>
                <div className="relative h-10 flex items-center">
                    <span className='absolute  text-muted-foreground left-2'>
                        <LiaUser className='h-4 w-5' />
                    </span>
                    <Input type="number" placeholder='Enter an Amount' id='receiving-account' className='pl-8 rounded-lg' />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label className="" htmlFor='amount'>Amount</Label>
                <div className="relative h-10 flex items-center">
                    <span className='absolute  text-muted-foreground left-2'>
                        <TbCurrencyNaira className='h-4 w-5' />
                    </span>
                    <Input type="number" placeholder='Enter the amount you want to send' id='amount' className='pl-8 rounded-lg' />
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
                    <Input type="text" placeholder='Enter your narration' id='naration' className=' pl-8 rounded-lg' />
                </div>

            </div>
            <Button className='w-50 mt-4 text-sm font-normal h-10'>
                Confirm Transaction
            </Button>
        </form>

    )
}

export default LightwayAccForm