import React, { useState } from 'react'

const AddFriendForm = ({handeAddFriend}) => {
 
  const [showAddForm,setShowAddForm] = useState(false);

  const [formData,setFormData] = useState({
    image:'https://i.pravatar.cc/48?u='+Date.now()
  });
  
  const handeFormChange = (e) => {
    setFormData((c)=>{
      return {...c,[e.target.name]:e.target.value,id:Date.now()}
    });
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    handeAddFriend(formData);
  }

  const handShowAddForm = () => {
    setShowAddForm((e)=>!e);
  }

  return (
    <>
    {showAddForm && 
        <form className="form-add-friend" onSubmit={onFormSubmit}>
            <label>👫 Name</label>
            <input type="text" value={formData.name} name="name" onChange={handeFormChange}/>
            <label>🌄 Image URL</label>
            <input type="text" value={formData.image} name="image" onChange={handeFormChange}/>
            <button className="button">Add</button>
        </form>
    }
    <button className="button" onClick={handShowAddForm}>{!(showAddForm)?"Add":"Close"}</button>
    </>
  )
}

export default AddFriendForm