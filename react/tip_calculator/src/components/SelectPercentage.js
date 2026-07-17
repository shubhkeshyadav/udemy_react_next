const SelectPercentage = ({percent_val,percent_name,onChangeHandler,children}) => {
  return (
    <table cellPadding={10}>
      <tr>
        <td>{children}</td>
        <td>
          <select name={percent_name} value={percent_val} onChange={onChangeHandler}>
            <option value="0">Dissatisfied (0%)</option>
            <option value="5">It was okay (5%)</option>
            <option value="10">It was good (10%)</option>
            <option value="20">Absolutely amazing! (20%)</option>
          </select>
        </td>
      </tr>
    </table>
  )
}

export default SelectPercentage