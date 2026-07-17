import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import Stats from "./components/Status";
import PackingList from "./components/PackingList";



const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 10, packed: true },
  { id: 3, description: "Radio", quantity: 5, packed: true },
];

function App(){
  const [items,setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  const handleDeleteItem = (itemId) => {
    setItems((i) => i.filter((item) => item.id !== itemId));
  }

  const handleToggleItem = (id) => {
    setItems((i)=>items.map((i)=>(id == i.id)?{...i,packed:(!i.packed)}:i));
  }

  const handleClearItemList = () => {
    const confirmed = window.confirm('Are you sure want to clear..?');
    if(confirmed){
      setItems([]);
    }
  }

  return (
    <div className="app">
        <Logo/>
        <Form handleNewAddItems={handleAddItems}/>
        <PackingList handleToggleItem={handleToggleItem} items={items} onRemove = {handleDeleteItem} onClear = {handleClearItemList}/>
        <Stats items={items}/>
    </div>
  )
}

export default App;