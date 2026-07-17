import { useState } from "react";


const BillForm = ({selectedFriend,handleBillSplit}) => {
  const [formData,setFormData] = useState({
    bill_value:'',
    your_expense:'',
    who_paying:'user',
    friend_expense:'',
  });

  const {bill_value,your_expense,who_paying,friend_expense} = formData;
 
  const handleFormChange = (e) => {
    setFormData((c)=>{
      if(e.target.name === 'your_expense'){
        c.friend_expense = (bill_value > 0) ? bill_value-e.target.value:'';
      }
      return {...c,[e.target.name]:e.target.value}
    });
  }

  return (
    <form className="form-split-bill" method="post">
        <h2>Split a bill with {selectedFriend.name}</h2>
        <label>💰 Bill value</label>
        <input type="text" name="bill_value" value={bill_value} onChange={handleFormChange}/>

        <label>🧍‍♀️ Your expense</label>
        <input type="text" name="your_expense" value={your_expense} onChange={handleFormChange}/>

        <label>👫 {selectedFriend.name}'s expense</label>
        <input disabled={true} type="text" name="friend_expense" value={friend_expense}/>

        <label>🤑 Who is paying the bill</label>
        <select name="who_paying" value={who_paying} onChange={handleFormChange}>
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
        <button type="button" className="button" onClick={()=>handleBillSplit(formData)}>Split bill</button>
    </form>
  )
}
export default BillForm