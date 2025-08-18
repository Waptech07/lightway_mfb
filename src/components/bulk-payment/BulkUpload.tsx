import React from 'react'
import TransferRecipients from './TransferRecipients'
import UploadDocument from './UploadDocument'

const BulkUpload = (): React.JSX.Element => {
  return (
    <div className="flex justify-between mt-4">
      <UploadDocument />
      <TransferRecipients />
    </div>
  )
}

export default BulkUpload