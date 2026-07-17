import { useState } from "react";
import Item from "./Item";
export default function PackingList({items,onRemove,handleToggleItem,onClear}) { 
   let sortedItems;
    const [sortBy, setSortBy] = useState("input");

    switch (sortBy) {
      case 'input':
        sortedItems = items;
      break;

      case 'description':
         sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
      break;

      case 'packed':
        sortedItems = items.sort((a, b) => Number(b.packed) - Number(a.packed));
      break;
    }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item,i)=><Item onToggleItem={handleToggleItem} onDelete={onRemove} key={i} item={item}/>)}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClear}>Clear list</button>
      </div>

    </div>
  );
}