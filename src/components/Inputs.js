import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {useRef, useState} from "react";

const InputBar = styled.div`
  display: flex;
`

const Input = styled.input`
  width: 80px;
  height: 80px;
  font-size: 60px;
  text-align: center;
  
`
const Button = styled.button`

`

export default function Inputs() {
    const inputRef = [useRef(), useRef(), useRef(), useRef(), useRef()]
    const inputChange = (e, i) => {

        setInputValue({...inputValue,[i]:e.nativeEvent.data})
        if (i + 1 < 5)
            inputRef[i + 1]?.current.focus();
    }

    let [inputValue, setInputValue] = useState(
        {
            0: "",
            1: "",
            2: "",
            3: "",
            4: ""
        }
    );


    return (
        <div className="Inputs">
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
                <Button onClick={()=>{console.log(inputValue)}}>submit</Button>
            </InputBar>
        </div>
    );
}