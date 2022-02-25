import {useSelector} from "react-redux";
import styled, {css} from "styled-components";
import data from "../data/data.json";

let answer = "none";

const KeyContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%,0);
  width: 200px;
  height: 265px;
  background-color: white;
  border-radius: 5px;
  ${props =>
          (props.over === "out") && css`
            display: none;
          `
  }

`

const S = styled.span`
  display: inline-block;
  font-size: 20px;
  width: 20px;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  background-color: dimgray;
`

//let str = [...new Set(props.input.join(""))].join('')


function Key(props) {
    const value = useSelector((state) => state)
    answer = data.data[value.key].word;
    console.log(props.over)

    const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    return (
        <KeyContainer over={props.over}>
            {alpha.map((c, i) => <S key={i}>{c} </S>)}
        </KeyContainer>
    );
}

export default Key;