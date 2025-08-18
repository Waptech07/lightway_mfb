import React from 'react'
import TransferRecipients from './TransferRecipients'
import UploadDocument from './UploadDocument'

const BulkUpload = (): React.JSX.Element => {
  return (
        <div className="flex justify-between flex-wrap gap-4 max-lg:gap-6">
      <UploadDocument />
      <TransferRecipients />
    </div>
  )
}

export default BulkUpload