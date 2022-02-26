import {useSelector} from "react-redux";
import styled, {css} from "styled-components";


const KeyContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);
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
  ${(props) => {
    if (Array.from(props.division.correct).includes(props.c))
      return css`background-color: rgb(140, 210, 130);`
    else if (Array.from(props.division.wrong).includes(props.c))
      return css`background-color: rgb(255, 212, 100);`
    else if (Array.from(props.division.notInclude).includes(props.c))
      return css`background-color: white;`

  }
  }
`




function Key(props) {
    const value = useSelector((state) => state)

    const alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

    return (
        <KeyContainer over={props.over}>
            {alpha.map((c, i) => <S key={i} division={value.status} c={c}>{c}</S>)}
        </KeyContainer>
    );
}

export default Key;