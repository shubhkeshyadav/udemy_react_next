import { useReducer, useState } from "react";

const initialState = {count:0,step:1};
const reducer = (state,action) => {
  switch (action.type) {
    case 'inc':
      state = {...state,count: state.count+state.step};
    break;

    case 'dec':
      state = {...state,count: state.count-state.step};
    break;

    case 'reset':
      state = initialState;
    break;

    case 'setsep':
      state = {...state,step:action.paylod};
    break;
  
    default:
      break;
  }
  return state; 
}

function DateCounter() {
  
  const [state,dispatch] = useReducer(reducer,initialState);
  

  const defineStep = (e) =>{
    dispatch({type:'setsep',paylod:Number(e.target.value)});
  }

  const increase = () =>{
    dispatch({type:'inc'});
  }

  const decrease = (e) =>{
    dispatch({type:'dec'});
  }

  const reset = () =>{
    dispatch({type:'reset'});
  }
  const date = new Date();
  date.setDate(date.getDate() + state.count);

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={decrease}>-</button>
        <input value={state.count}/>
        <button onClick={increase}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
