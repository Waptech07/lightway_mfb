import React from 'react'

const DashboardQA = ({header,details}:{header:string,details:string}):React.JSX.Element => {
  return (
   <div>
    <h3>{header}</h3>
    <p>{details}</p>
   </div>
  )
}

export default DashboardQA