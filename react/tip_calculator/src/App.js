import { useState } from "react";
import BillInput from "./components/BillInput";
import Output from "./components/Output";
import Reset from "./components/Reset";
import SelectPercentage from "./components/SelectPercentage";

const initialVals = {
    bill_value:0,
    percent_1:0,
    percent_2:0
  };

function App(){
  const [formData,setFormData] = useState(initialVals);

  function changeHandler(e){
    setFormData((c)=>{
      return {...c,[e.target.name]:Number(e.target.value)}
    });
  }

  const handleReset = () => {
    setFormData(initialVals);
  }

  return <>
    <BillInput onChangeHandler={changeHandler} bill_amt={formData.bill_value}/>

    <SelectPercentage onChangeHandler={changeHandler} percent_val={formData.percent_1} percent_name="percent_1">
      How did you like the service?
    </SelectPercentage>

    <SelectPercentage onChangeHandler={changeHandler} percent_name="percent_2" percent_val={formData.percent_2}>
      How did your friend like the service?
    </SelectPercentage>

    <Output formData={formData}/>

    <Reset onReset={handleReset}/>

  </>
}


export default App;
