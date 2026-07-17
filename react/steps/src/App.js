import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
  "Became Rich 🤑",
  "Spend Happy Life 🤑",
  "Die 💼",
];

function App(){
  return <>
  <StepsComp/>
  </>
}

function StepsComp() {
  let myVal = 0;
  const [step,setStep] = useState(1);
  const [isOpen,setIsOpen] = useState(true);
  const handleNext = () => {
    if(step < messages.length){
      setStep((s) => s + 1);
      myVal++;
    }
  }
  
  const handlePrev = () => {
    if(step > 1){
      setStep((s) => s - 1);
    }
  }

  

  return (
    <>
      <button className="close" onClick={()=>setIsOpen(!isOpen)}>X</button>
      { isOpen &&
        <div className="steps">
          <div className="numbers">
            {messages.map((msg,noOfStep)=>{
              return (
                <StepRender key={noOfStep} num={noOfStep+1}  cStep={step}/>
              )
            })}
          </div>

          <MsgRender cStep={step}/>

          <div className="buttons">
              <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrev}>
                <span>👈</span> Previous
              </Button>

              <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
                Next <span>👉</span>
                <span>🤓</span>
              </Button>
          </div>
        </div>
      }
    </>
  );
}

const MsgRender = ({cStep}) => {
  let msg = messages[cStep-1];
  return (
    <p className="message">{msg}</p>
  );
}

const StepRender = ({num,cStep}) => {
  return (
    <div className={`step-${num} ${(cStep>=num)?'active':''}`}>{num}</div>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default App;
