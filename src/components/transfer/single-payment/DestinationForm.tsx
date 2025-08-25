import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { TbCurrencyNaira } from "react-icons/tb";
import { LuMessageSquareText } from "react-icons/lu";
import { LiaUser } from "react-icons/lia";
import { SelectItem, Select, SelectContent, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import ConfirmPaymentDialog from './ConfirmPaymentDialog';
import { useCustomMutation } from '@/hooks/useCustomQuery';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
type DestinationFormValueType = {
    amount: string,
    narration: string,
    destinationAccount: string
}
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
const { formState: { errors }, register, handleSubmit } = useForm<DestinationFormValueType>();
  //remember to change to appropriate route later and add error handler tomorrow
  const { mutate } = useCustomMutation<DestinationFormValueType, any>({ url: "auth/login", key: "login", });
  const onSubmit: SubmitHandler<DestinationFormValueType> = (data) => {
    mutate(data, {
      onError(error) {
        toast(`${error}`);
      },
    });
  };
    return (
        <form className="flex flex-col gap-4 pt-9 w-96 max-tab:w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <Label className="" htmlFor='amount'>Select Destination Account</Label>
                <Select>
                    <SelectTrigger className="w-full relative pl-10 data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground">
                        <SelectValue placeholder="Select Destination Account" />
                        <span className='absolute left-2'>
                            <LiaUser className='h-4 w-5' />
                        </span>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="my-accounts">My Accounts</SelectItem>
                        <SelectItem value="lightway-accounts">Lightway Accounts</SelectItem>
                        <SelectItem value="other-banks">Other Banks</SelectItem>
                    </SelectContent>
                </Select>
                {errors.destinationAccount && (
                    <p className="text-red">{errors.destinationAccount.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <Label className="" htmlFor='amount'>Amount</Label>
                <div className="relative h-10 flex items-center">
                    <span className='absolute  text-muted-foreground left-2'>
                        <TbCurrencyNaira className='h-4 w-5' />
                    </span>
                    <Input type="text" {...register("amount")} placeholder='Enter an Amount' id='amount' className='pl-8 rounded-lg' />
                </div>

            </div>
            <div className="flex flex-col gap-2">
                <Label className="" htmlFor='narration'>Narration</Label>
                <div className="relative h-10 flex items-center">
                    <span className='absolute  text-muted-foreground left-2'>
                        <LuMessageSquareText className='h-4 w-5' />
                    </span>
                    <Input type="text" {...register("narration")} placeholder='Enter your narration' id='narration' className=' pl-8 rounded-lg' />
                </div>

            </div>
             {/*  */}
            <Button type='submit' className='w-50 mt-4 text-sm font-normal h-10' onClick={() => setOpenConfirmDialog(true)}>
                Confirm Transaction
            </Button>
            <ConfirmPaymentDialog setOpenDialog={setOpenConfirmDialog} openDialog={openConfirmDialog} bankTransferData={bankTransferData} />
        </form>
    )
}

export default DestinationForm