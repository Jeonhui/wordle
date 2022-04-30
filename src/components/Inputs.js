import {useDispatch, useSelector} from "react-redux";
import {useEffect, createRef, useRef, useState} from "react";
import {send_input} from "../function/send_input";
import Log from "./Log";
import styled, {css} from "styled-components";
import {motion} from "framer-motion";
import Key from "./keyboard";
import Info from "./Info";

const MAX_COUNT = 5;
const MOD_MAX_COUNT = 10;

const Container = styled.div`
  position: absolute;
  height: 100%;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  color: white;
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
  overflow: visible;
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
  bottom: 0;
  display: inline-block;

  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;

  @media all and (max-width: 500px) {
    font-size: 15px;
    right: 10px;
  }

  @media all and (min-width: 500px) {
    font-size: 20px;
    right: 0;
  }

  &:hover {
    color: dimgray;
  }

  &:active {
    color: cornflowerblue;
  }
`

const Q = styled.div`
  position: absolute;
  display: inline-block;
  font-weight: bold;
  bottom: 0;
  border-radius: 20px;


  @media all and (max-width: 500px) {
    width: 10px;
    height: 10px;
    padding: 1.5px 2px 2.5px 2px;
    font-size: 10px;
    margin-bottom: 10px;
    left: 20px;
    -webkit-appearance: none;
    border: white 1px solid;
  }

  @media all and (min-width: 500px) {
    width: 15px;
    height: 15px;
    padding: 1px 2px 3px 2px;
    font-size: 15px;
    margin-bottom: 10px;
    left: 0;
    border: white 2px solid;
  }

  &:hover {
    color: dimgray;
    border: dimgray 2px solid;
  }
`

const InputContainer = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  max-height: 30%;
  ${(props) => (props.visible !== "") && css`
    display: none;
  `}
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

const Input = styled(motion.input)`
  display: table-cell;
  padding: 0;
  border: none;
  text-align: center;
  vertical-align: middle;
  color: white;
  background-color: rgb(218, 218, 218);
  border-radius: 5px;
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
  color: white;
  font-weight: bold;

  border-radius: 5px;
  @media all and (max-width: 500px) {
    width: 274px;
    height: 30px;
    font-size: 20px;
    margin: 0 0 5px 0;
    box-shadow: inset -2px 2px 2px rgb(80, 120, 170);
  }
  @media all and (min-width: 500px) {
    width: 440px;
    height: 40px;
    font-size: 20px;
    margin: 0 0 10px 0;
    box-shadow: inset -3px 3px 3px rgb(80, 120, 170);
  }
`

const Result = styled(motion.div)`
  position: relative;

  border-radius: 10px;
  color: black;
  background-color: white;
  margin-top: 20px;
  text-align: center;
  @media all and (max-width: 500px) {
    width: 80%;
    left: 10%;
  }
  @media all and (min-width: 500px) {
    width: 100%;
  }

  ${(props) => props.res !== "" ? css`display: block;` : css`display: none;`}
}`

const ResultTitle = styled.div`
  padding: 25px 0 10px 0;
  font-weight: bold;
  font-size: 25px;
`

const Res = styled.div`
  width: 100%;
  font-size: 25px;
  text-align: center;
`

const R = styled.div`
  padding-bottom: 15px;
`

let answer = "none";

export default function Inputs() {
    const value = useSelector((state) => state);
    //redux state값 가져오기


    answer = value.key;

    const inputRef = [useRef(), useRef(), useRef(), useRef(), useRef()];
    //각 input의 주소 저장하는 배열

    const logRef = createRef();

    const [toggle, setToggle] = useState(false);
    // 변화 감지 state

    const [result, setResult] = useState("");
    // 결과를 저장하는 state

    const [over, setOver] = useState("out");
    //title에 마우스가 올라가있는 지 확인하는 state

    const [info, setInfo] = useState("out");
    //info에 마우스가 올라가있는 지 확인하는 state

    const [count, setCount] = useState(0);
    //submit 횟수세는 state

    const [mode, setMode] = useState(false);
    const [modeCount, setModeCount] = useState(0);
    //모드 설정을 위한 state

    const [inputValue, setInputValue] = useState({
        0: "", 1: "", 2: "", 3: "", 4: ""
    }); //각 input의 값 저장

    const inputChange = (e, i) => {
        if (('a' <= e.nativeEvent.data && e.nativeEvent.data <= 'z') || ('A' <= e.nativeEvent.data && e.nativeEvent.data <= 'Z')) {
            setInputValue({...inputValue, [i]: e.nativeEvent.data})
            if (i + 1 < 5) inputRef[i + 1]?.current.focus();
        }
    }//input 변화 감지

    const inputBackspace = (e, i) => {
        if (inputValue[i] !== "") {
            setInputValue({
                ...inputValue, [i]: ""
            });
        } else {
            if (i > 0) {
                inputRef[i - 1]?.current.focus();
                setInputValue({
                    ...inputValue, [i - 1]: ""
                });
            }
        }
    }//input에 backspace를 눌렀을 때

    useEffect(() => {
    })

    const dispatch = useDispatch() //액션 전달

    const drawResult = () => {
        let r = ""
        for (let i = 0; i < 5; i++) {
            if (inputValue[i] === answer[i]) {
                r += " 🟩"
            } else if (answer.indexOf(inputValue[i]) !== -1) {
                r += " 🟨"
            } else {
                r += " 🟥"
            }
        }

        dispatch({
            type: "push_Log",
            text: r + "\n"
        })
    }

    const submit = () => {
        if (inputValue[0] !== "" && inputValue[1] !== "" && inputValue[2] !== "" && inputValue[3] !== "" && inputValue[4] !== "") {
            dispatch(send_input(inputValue));
            setToggle(!toggle);
            drawResult();

            setInputValue({
                0: "", 1: "", 2: "", 3: "", 4: ""
            });

            setCount(count + 1);
            inputRef[0]?.current.focus();


            if ((inputValue[0] + inputValue[1] + inputValue[2] + inputValue[3] + inputValue[4]).toLowerCase() === answer) {
                setResult("Success");
                dispatch({type: "reset"});
                dispatch(send_input(answer));

            } else {
                if (value.data.length >= ((!mode) ? MAX_COUNT : MOD_MAX_COUNT)) {
                    setResult("Failed");
                    dispatch({type: "reset"});
                    dispatch(send_input(answer));
                }
            }

        } else {
            alert("다섯 글자를 모두 채워주세요");
            for (let i = 0; i < 5; i++) {
                if (inputValue[i] === "") {
                    inputRef[i]?.current.focus();
                    break
                }
            }
        }
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight
        }
    }//submit 버튼

    return (<Container>
        <TitleBar>
            <Q onMouseOver={() => {
                setInfo("over")
            }} onMouseOut={() => {
                setInfo("out")
            }}>?</Q>
            <Title onMouseOver={() => {
                setOver("over");
            }} onMouseOut={() => {
                setOver("out")
            }} onClick={() => {
                setModeCount(modeCount + 1);
                if (modeCount > 4) {
                    setModeCount(0);
                    let input = window.confirm("모드 사용" + (mode ? "해제" : ""));
                    if (input === true) {
                        setMode(!mode)
                    }
                }
            }}>Wordle</Title><Next onClick={() => {
            dispatch({type: "reset"});
            dispatch({type: "next"})
            setResult("");
            setCount(0);
        }}> NEXT </Next></TitleBar>
        <Log ref={logRef}/>
        <InputContainer visible={result} animate={{y: [300, 0]}}
                        transition={{duration: 1}}>
            <InputBar>
                <Input value={inputValue[0]} ref={inputRef[0]} onChange={(e) => {
                    inputChange(e, 0)
                }} onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        submit()
                    } else if (e.key === "Backspace") {
                        setInputValue({...inputValue, [0]: ""})
                    }
                }}/>
                <Input value={inputValue[1]} ref={inputRef[1]} onChange={(e) => {
                    inputChange(e, 1)
                }} onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        submit()
                    } else if (e.key === "Backspace") {
                        inputBackspace(e, 1)
                    }
                }}/>
                <Input value={inputValue[2]} ref={inputRef[2]} onChange={(e) => {
                    inputChange(e, 2)
                }} onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        submit()
                    } else if (e.key === "Backspace") {
                        inputBackspace(e, 2)
                    }
                }}/>
                <Input value={inputValue[3]} ref={inputRef[3]} onChange={(e) => {
                    inputChange(e, 3)
                }} onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        submit()
                    } else if (e.key === "Backspace") {
                        inputBackspace(e, 3)
                    }
                }}/>
                <Input value={inputValue[4]} ref={inputRef[4]} onChange={(e) => {
                    inputChange(e, 4)
                }} onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        submit()
                    } else if (e.key === "Backspace") {
                        inputBackspace(e, 4)
                    }
                }}/>
            </InputBar>
            <Button onClick={submit}>submit</Button>
        </InputContainer>
        <Result res={result} animate={{scale: [0, 1]}}
                transition={{duration: 1, delay: 3.38}}><ResultTitle>Result</ResultTitle>
            <Res>
                <R>{result}</R>
                <R>Try : {count}</R>
                <R>
                    <pre>Record<br/>{value.log}</pre>
                </R>
            </Res>
        </Result>

        <Key over={over}/>
        <Info over={info}/>
    </Container>);
}