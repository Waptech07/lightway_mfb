import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { TbCurrencyNaira } from "react-icons/tb";
const DestinationForm = (): React.JSX.Element => {
    return (
        <form className="flex flex-col gap-10 pt-9 w-96">
            <div className="flex flex-col gap-2">
                <Label className="" htmlFor='amount'>Amount</Label>
                <div className="relative h-10 flex items-center">
                    <span className='absolute  text-muted-foreground left-2'><TbCurrencyNaira /></span>
                <Input type="number" placeholder='Enter an Amount' id='amount' className=' pl-6 rounded-lg text-2xl' /></div>

                </div>  
                   <div className="flex flex-col gap-2">
                <Label className="" htmlFor='amount'>Amount</Label>
                <div className="relative h-10 flex items-center">
                    <span className='absolute  text-muted-foreground left-2'><TbCurrencyNaira /></span>
                <Input type="number" placeholder='Enter an Amount' id='amount' className=' pl-6 rounded-lg text-2xl' /></div>

                </div>
                 <div className="flex flex-col gap-2">
                <Label className="" htmlFor='amount'>Amount</Label>
                <div className="relative h-10 flex items-center">
                    <span className='absolute  text-muted-foreground left-2'><TbCurrencyNaira /></span>
                <Input type="number" placeholder='Enter an Amount' id='amount' className=' pl-6 rounded-lg text-2xl' /></div>

                </div>
                
        </form>
    )
}

export default DestinationForm