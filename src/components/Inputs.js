import {useDispatch} from "react-redux";
import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import {send_input} from "../function/send_input";
import Log from "./Log";

const Container = styled.div`
  position: absolute;
  height: 100%;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  @media all and (max-width: 500px) {
    width: 100%;
  }
  @media all and (min-width: 500px) {
    width: 500px;
  }
`

const TitleBar = styled.div`
  position: relative;
  width: 100%;
  height: 10%;
  max-height: 10%;
  @media all and (max-width: 500px) {
    height: 60px;
  }

  @media all and (min-width: 500px) {
    height: 70px;
  }
`

const Title = styled.div`
  position: absolute;
  transform: translate(-50%);
  display: inline-block;
  font-weight: bold;
  @media all and (max-width: 500px) {
    font-size: 30px;
    height: 40px;
    margin: 10px 0 10px 0;
  }
  
  @media all and (min-width: 500px) {
    font-size: 40px;
    height: 50px;
    margin: 10px 0 10px 0;
  }
`

const Next = styled.button`
  position: absolute;
  transform: translate(-50%);
  display: inline-block;
  
  background-color: rgba(0,0,0,0);
  border: none;
  font-weight: bold;
  @media all and (max-width: 500px) {
    font-size: 20px;
    height: 40px;
    margin: 10px 0 10px 0;
    right: 10px;
  }

  @media all and (min-width: 500px) {
    font-size: 30px;
    height: 50px;
    margin: 10px 0 10px 0;
    right: 0;
  }
  
  &:hover{
    color: dimgray;
  }
  
  &:active{
    color: cornflowerblue;
  }
`

const InputContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  max-height: 30%;
`

const InputBar = styled.div`
  width: 100%;
  display: table;
  @media all and (max-width: 500px) {
    top: 5px;
    border-spacing: 5px;
    margin: 0 0 5px 0;
  }
  @media all and (min-width: 500px) {
    top: 10px;
    border-spacing: 10px;
    margin: 0 0 10px 0;
  }
`

const Input = styled.input`
  display: table-cell;
  padding: 0;
  border: none;
  text-align: center;
  vertical-align: middle;
  background-color: rgb(218, 218, 218);

  @media all and (max-width: 500px) {
    width: 50px;
    height: 50px;
    margin: 3px;
    font-size: 30px;
    box-shadow: inset -2px 2px 2px rgb(150, 150, 150);
    &:focus {
      outline: rgb(150, 150, 150) 1px solid;
    }
  }

  @media all and (min-width: 500px) {
    width: 80px;
    height: 80px;
    margin: 5px;
    font-size: 50px;
    box-shadow: inset -3px 3px 3px rgb(150, 150, 150);
    &:focus {
      outline: rgb(150, 150, 150) 2px solid;
    }
  }
`

const Button = styled.button`
  padding: 0;
  background-color: rgb(110, 150, 230);
  border: none;
  border-radius: 5px;
  color: black;

  @media all and (max-width: 500px) {
    width: 250px;
    height: 25px;
    font-size: 15px;
    margin: 0 0 5px 0;
    box-shadow: inset -2px 2px 2px rgb(80, 120, 170);
  }
  @media all and (min-width: 500px) {
    width: 400px;
    height: 30px;
    font-size: 20px;
    margin: 0 0 10px 0;
    box-shadow: inset -3px 3px 3px rgb(80, 120, 170);
  }
`

const answer = "train";

export default function Inputs() {
    const inputRef = [useRef(), useRef(), useRef(), useRef(), useRef()]
    //각 input의 주소 저장하는 배열

    const [toggle, setToggle] = useState(false);

    const inputChange = (e, i) => {
        console.log(e.nativeEvent.data)
        if (('a' <= e.nativeEvent.data && e.nativeEvent.data <= 'z') || ('A' <= e.nativeEvent.data && e.nativeEvent.data <= 'Z')) {
            setInputValue({...inputValue, [i]: e.nativeEvent.data})
            if (i + 1 < 5)
                inputRef[i + 1]?.current.focus();
        }
    }//input 변화 감지

    useEffect(() => {
        console.log(toggle)
    }, [toggle])

    let [inputValue, setInputValue] = useState(
        {
            0: "",
            1: "",
            2: "",
            3: "",
            4: ""
        }
    ); //각 input의 값 저장

    const submit = () => {
        if (inputValue[0] !== "" && inputValue[1] !== "" && inputValue[2] !== "" && inputValue[3] !== "" && inputValue[4] !== "") {
            dispatch(send_input(inputValue));
            setToggle(!toggle);
            setInputValue({
                0: "",
                1: "",
                2: "",
                3: "",
                4: ""
            });
            if ((inputValue[0] + inputValue[1] + inputValue[2] + inputValue[3] + inputValue[4]).toLowerCase() === answer) {
                alert("정답입니다.");
            }
        } else {
            alert("다섯 글자를 모두 채워주세요");
        }
    }//submit 버튼

    const dispatch = useDispatch() //액션 전달

    return (
        <Container>
            <TitleBar><Title>Wrodle</Title><Next onClick={()=>{dispatch({type:"reset"})}}> > </Next></TitleBar>
            <Log/>
            <InputContainer>
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
                </InputBar>
                <Button onClick={submit}>submit</Button>
            </InputContainer>
        </Container>
    );
}