import React from 'react'

const Output = ({formData}) => {
  const {bill_value,percent_1,percent_2} = formData;
  
  const tip = bill_value * ((percent_1 + percent_2) / 2 / 100);

  const totalBill = bill_value+tip;

 
  return (
    <table cellPadding={10}>
      <tr>
        <td>
          <h3>
            You pay ${totalBill} (${bill_value} + ${tip} tip)
          </h3>
        </td>
      </tr>
    </table>
  )
}

export default Output