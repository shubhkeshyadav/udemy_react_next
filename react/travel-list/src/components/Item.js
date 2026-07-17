export default function Item({item,onDelete,onToggleItem}){
  return (<li>
          <input
              checked = {item.packed}
              type="checkbox"
              value={item.packed}
              onChange={() => onToggleItem(item.id)}
            />
            <span style={item.packed?{textDecoration:'line-through'}:{}}>{item.quantity} {item.description}</span>
            <buton style={{color:'red',cursor: 'pointer'}} onClick={()=>onDelete(item.id)}>x</buton>
        </li>)
}