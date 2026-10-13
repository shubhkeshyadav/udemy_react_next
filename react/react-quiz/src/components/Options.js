const Options = ({question,dispatch,answer}) => {
const hasAnswer = answer!=null;

  return (
    <div className={`options`}>
        {question.options.map((val,index)=>{
            const answerHighlighted = (hasAnswer && index == answer)?'answer':'';
            return <button  className={`btn btn-option ${answerHighlighted}`} key={index}>{val}</button>
        })}
    </div>
  )
}

export default Options