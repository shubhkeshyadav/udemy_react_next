import { useState } from "react";

export default function Form({handleNewAddItems}) {
  
  const [formData,setFormData] = useState({});

  const handeFormChange = (e) => {
    setFormData((c)=>{
      return {...c,[e.target.name]:e.target.value}
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!formData.description){
      return false;
    }
    const newItem = {...formData,id:Date.now(),packed:false}
    handleNewAddItems(newItem);
    setFormData({});
    
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select required name="quantity" onChange={handeFormChange} value={(formData.quantity)?formData.quantity:''}>
        <option value="" key="sel">Select Qty</option>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..." value={(formData.description)?formData.description:''} name="description" onChange={handeFormChange}/>
      <button>Add</button>
    </form>
  );
}