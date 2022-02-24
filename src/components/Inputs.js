import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {useRef, useState} from "react";
import {send_input} from "../function/send_input";
import Log from "./Log";

const InputBar = styled.div`

`

const Input = styled.input`
  width: 80px;
  height: 80px;
  font-size: 60px;
  text-align: center;

`
const Button = styled.button`
  width: 80px;
  height: 80px;
`

export default function Inputs() {
    const inputRef = [useRef(), useRef(), useRef(), useRef(), useRef()]
    //각 input의 주소 저장하는 배열

    const[toggle,setToggle] = useState(true);

    const inputChange = (e, i) => {
        setInputValue({...inputValue, [i]: e.nativeEvent.data})
        if (i + 1 < 5)
            inputRef[i + 1]?.current.focus();
    }//input 변화 감지

    let [inputValue, setInputValue] = useState(
        {
            0: "",
            1: "",
            2: "",
            3: "",
            4: ""
        }
    ); //각 input의 값 저장

    const dispatch = useDispatch() //액션 전달

    return (
        <div className="Inputs">
            <Log/>
            <InputBar>
                <Input value={inputValue[0]} ref={inputRef[0]} onChange={(e) => {
                    inputChange(e, 0)
                }}/>
                <Input value={inputValue[1]} ref={inputRef[1]} onChange={(e) => {
                    inputChange(e, 1)
                }}/>
                <Input value={inputValue[2]} ref={inputRef[2]} onChange={(e) => {
                    inputChange(e, 2)
                }}/>
                <Input value={inputValue[3]} ref={inputRef[3]} onChange={(e) => {
                    inputChange(e, 3)
                }}/>
                <Input value={inputValue[4]} ref={inputRef[4]} onChange={(e) => {
                    inputChange(e, 4)
                }}/>
                <Button onClick={() => {
                    dispatch(send_input(inputValue));
                    setToggle(!toggle);
                }}>submit</Button>
            </InputBar>
        </div>
    );
}