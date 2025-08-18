import React from 'react'
import Beneficiaries from './Beneficiaries'
import OtherAccountForm from './OtherAccountForm'

const OtherBanks = (): React.JSX.Element => {
    return (
        <div className="flex justify-between flex-wrap pt-9 gap-4 ">
            {/* <LightwayAccForm /> max-lg:gap-6*/}
            <OtherAccountForm/>
            <Beneficiaries />
        </div>
    )
}

export default OtherBanks