import React from 'react'
import TransferRecipients from './TransferRecipients'
import BulkBeneficiaries from './BulkBeneficiaries'

const Beneficiaries = (): React.JSX.Element => {
  return (
    <div className="flex justify-between flex-wrap gap-4 max-lg:gap-6">
      <BulkBeneficiaries />
      <TransferRecipients />
    </div>
  )
}

export default Beneficiaries