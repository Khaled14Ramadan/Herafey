import './App.css';
import { useSelector,useDispatch} from 'react-redux'
import {changeLang} from "./Redux/Languageslice/languageslice"
import messages from './Locale/messages';
function App() {
  
  const test=useSelector((state)=>state.lang.lang)
  const dispatch=useDispatch()
const changeL=()=>{
  dispatch(changeLang())
}
const {title}=messages[test]
  return (
    <div className={test==="en"?"english":"arabic"}>
<p>{title}</p>
{test}
<button onClick={changeL}>click me</button>
    </div>
  );
}

export default App;
