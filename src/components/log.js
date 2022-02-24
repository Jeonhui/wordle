import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";



function Log() {

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

export default Log;