import './App.css';
import {useDispatch, useSelector} from "react-redux";

function App() {

    const value = useSelector((state) => state)
    const dispatch = useDispatch()

    return (
        <div className="App">
            <button onClick={() => {
                dispatch({type: '입력'})
            }}>제출</button>
            <div>값: {value}</div>
        </div>
    );
}

export default App;
