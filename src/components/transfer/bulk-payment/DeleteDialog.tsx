import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BsExclamationCircle } from "react-icons/bs";

interface DeleteDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | number | null;
  onConfirm: () => void;
}

const DeleteDialog = ({ openDialog, setOpenDialog, userId, onConfirm }: DeleteDialogProps):React.JSX.Element => {
  const handleRemove = () => {
    onConfirm();
    setOpenDialog(false); // Ensure dialog closes after action
  };


  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className='w-100 flex gap-8 flex-col' onOpenAutoFocus={(e) => {
        // Ensure dialog doesn't have aria-hidden when focused
        if (e.currentTarget) {
          const dialog = (e.currentTarget as Element).closest('[role="dialog"]');
          if (dialog && dialog.hasAttribute('aria-hidden')) {
            dialog.removeAttribute('aria-hidden');
          }
        }
      }} showCloseButton={false}>
        <DialogHeader>
          <div className="rounded-full w-min p-2 bg-[rgba(254,243,242,1)]">
            <div className="rounded-full w-min p-2 bg-[rgba(254,228,226,1)]">
              <BsExclamationCircle className='text-red text-xl' />
            </div>  
            </div>
          <DialogTitle className='text-gray-900 text-lg'>Remove from Recipient List</DialogTitle>
          <DialogDescription className='text-[rgba(102,112,133,1)] text-sm font-normal'>
            Are you sure you want to remove this recipient from this list? You can add them back anytime.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className=''>
          <DialogClose asChild>
            <Button className='bg-gray-200 px-4 py-2 rounded-md text-sm font-semibold text- hover:bg-gray-300 flex-1'>Cancel</Button>
          </DialogClose>
          <Button className='bg-[rgba(217,45,32,1)] hover:bg-red-500 px-4 p  y-2 rounded-md text-sm font-semibold text-white flex-1' onClick={handleRemove}>
            Remove
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default DeleteDialog