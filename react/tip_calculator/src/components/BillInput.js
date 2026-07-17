const BillInput = ({bill_amt,onChangeHandler}) => {
  return (
    <table cellPadding={10}>
      <tr>
        <td><label>How much was the bill?</label></td>
        <td><input onChange={onChangeHandler} name="bill_value" type="text" placeholder="Bill value" value={bill_amt}/></td>
      </tr>
    </table>
  )
}

export default BillInput