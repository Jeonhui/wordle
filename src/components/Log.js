import {useEffect} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";

const LBox = styled.div`
  position: relative;
  left: 50%;
  top: 10px;
  transform: translate(-50%);
  display: table;
  border-spacing: 10px;
`

const L = styled.div`
  display: table-cell;
  width: 80px;
  height: 80px;
  font-size: 50px;
  border: 1px solid black;
  border-radius: 10px;
  vertical-align: middle;

`;


function Log() {

    const value = useSelector((state) => state)

    return (
        <div className="App">
            {(Object.values(value)).map((str, idx)=><LBox key={idx}>{(str.split("")).map((c,i)=><L key={i}>{c}</L>)}</LBox>)}
        </div>
    );
}

export default Log;