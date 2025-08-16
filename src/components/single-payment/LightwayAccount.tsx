import React from 'react'
import LightwayAccForm from './LightwayAccForm'
import Beneficiaries from './Beneficiaries'

const LightwayAccount = ():React.JSX.Element => {
    return (
        <div className="flex justify-between  pt-9">
            <LightwayAccForm />
            <Beneficiaries/>
        </div>
    )
}

export default LightwayAccount