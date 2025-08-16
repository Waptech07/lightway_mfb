import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { TbCurrencyNaira } from "react-icons/tb";
import { LuMessageSquareText } from "react-icons/lu";
import { LiaUser } from "react-icons/lia";
import { SelectItem, Select, SelectContent, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
const DestinationForm = (): React.JSX.Element => {
    return (
        <form className="flex flex-col gap-4 pt-9 w-96">
            <div className="flex flex-col gap-2">
                <Label className="" htmlFor='amount'>Select Destination Account</Label>
                <Select>
                    <SelectTrigger className="w-full relative pl-10">
                        <SelectValue placeholder="Select Destination Account" />
                        <span className='absolute left-2 text-muted-foreground'>
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
            <Button className='w-50 mt-4 text-sm font-normal h-10'>
                Confirm Transaction
            </Button>
        </form>
    )
}

export default DestinationForm