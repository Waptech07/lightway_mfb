import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { BsExclamationCircle } from "react-icons/bs";
const DeleteDialog = ({ openDialog, setOpenDialog, userId }: { setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, openDialog: boolean, userId: any }) => {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog} >
      <DialogContent className='w-100 flex gap-8 flex-col' showCloseButton={false}>
        <DialogHeader>
          <div className="rounded-full w-min p-2 bg-[rgba(254,243,242,1)]">


            <div className="rounded-full w-min p-2 bg-[rgba(254,228,226,1)]">

              <BsExclamationCircle className='text-red text-xl' />
            </div>  </div>
          <DialogTitle className='text-gray-900 text-lg'>Remove from Recipient List</DialogTitle>
          <DialogDescription className='text-gray-500 text-sm font-normal'>
            Are you sure you want to remove this recipient from this list? You can add them back anytime.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className=''>
          <DialogClose asChild>
            <Button className='bg-gray-200 px-4 py-2 rounded-md text-sm font-semibold text-primary hover:bg-gray-300 flex-1'>Cancel</Button>
          </DialogClose>
          <Button className='bg-[rgba(217,45,32,1)] hover:bg-red-500 px-4 p  y-2 rounded-md text-sm font-semibold text-white flex-1'>
            Remove
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default DeleteDialog