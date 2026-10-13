import { useEffect, useReducer } from 'react';
import DateCounter from './components/DateCounter';
import Header from './components/Header';
import Main from './components/Main';
import './index.css'
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';

const initialState = {
  questions:[],
  // 'loading','error','active','ready','finished'
  status:"loading",
  index:0,
  answer:null
}

function reducer(state,action){
  switch (action.type) {
    case 'dataReceived':
      return {...state,questions:action.payload,status:'ready'} 
    break;

    case 'dataFailed':
      return {...state,status:'error'}
    break;

    case 'start':
      return {...state,status:'active'}
    break;

    case 'newAnswer':
      return {...state,answer:action.payload}
    break;

    default:
      throw new Error('Unknown action');
    break;
  }
}

function App() {
  const [{status,questions,index,answer},dispatch] = useReducer(reducer,initialState);
  const totalQuestions = questions.length;

  useEffect(()=>{
    fetch("http://localhost:9090/questions")
    .then(resp=>resp.json())
    .then(data=>dispatch({type:'dataReceived',payload:data}))
    .catch(error=>dispatch({type:'dataFailed'}));
  },[]);

  return (
    <div className='app'>
    <Header/>
    <Main>
      {status=='loading' && <Loader/>}
      {status=='error' && <Error/>}
      {status=='ready' && <StartScreen totalQuestions={totalQuestions} dispatch={dispatch}/>}
      {status=='active' && <Question answer={answer} dispatch={dispatch} question={questions[index]}/>}
    </Main>
    </div>
  );
}

export default App;
