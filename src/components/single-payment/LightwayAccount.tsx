import React from 'react'
import LightwayAccForm from './LightwayAccForm'
import Beneficiaries from './Beneficiaries'

const LightwayAccount = ():React.JSX.Element => {
    return (
        <div className="flex justify-between flex-wrap pt-9 gap-4 max-lg:gap-6">
            <LightwayAccForm />
            <Beneficiaries/>
        </div>
    )
}

export default LightwayAccount