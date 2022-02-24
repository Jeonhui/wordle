import './App.css';
import {useDispatch, useSelector} from "react-redux";
import Inputs from "./components/Inputs";

function App() {

    const value = useSelector((state) => state)
    const dispatch = useDispatch()

    return (
        <div className="App">
            <Inputs/>
        </div>
    );
}

export default App;
