const ListBox = ({children}) => {
const [open,setOpen] = useState(true);
return (
    <div className="box">
        <button onClick={()=>{setOpen((open)=>!open)}} className="btn-toggle">{open?'-':'+'}</button>
        {open &&  children}
    </div>
    ) 
}    
export default ListBox