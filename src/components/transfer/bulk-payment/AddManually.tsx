import React from 'react'
import AddManuallyForm from './AddManuallyForm'
import TransferRecipients from './TransferRecipients'

const AddManually = (): React.JSX.Element => {
  return (
    <div className="flex justify-between flex-wrap gap-4 max-lg:gap-6">
      <AddManuallyForm />
      <TransferRecipients />
    </div>
  )
}

export default AddManually