import {useSelector} from "react-redux";
import styled, {css} from "styled-components";
import {motion} from "framer-motion";
import {forwardRef} from "react";


let answer = "none";

const LBox = styled.div`
  position: relative;
  display: table;
  left: 50%;
  top: 10px;
  transform: translate(-50%);
  border-spacing: 10px;
  margin: 0;
`


const L = styled(motion.div)`
  display: table-cell;
  vertical-align: middle;
  color: white;
  border-radius: 5px;

  @media all and (max-width: 500px) {
    width: 50px;
    height: 50px;
    font-size: 30px;
    margin: 3px;
  }

  @media all and (min-width: 500px) {
    width: 80px;
    height: 80px;
    font-size: 50px;
    margin: 5px;
  }


  ${(props) => {
    if (props.c === answer[props.i])
      return css`background-color: rgb(140, 210, 130);
        box-shadow: inset -3px 3px 3px rgb(130, 180, 120);`
    else if (answer.indexOf(props.c) !== -1)
      return css`background-color: rgb(255, 212, 100);
        box-shadow: inset -3px 3px 3px rgb(255, 190, 20);`
    else
      return css`background-color: rgb(255, 141, 141);
        box-shadow: inset -3px 3px 3px rgb(255, 100, 100);`
  }
  }
`;

const Empty = styled(L)`
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  @media all and (max-width: 500px) {
    width: 50px;
    height: 50px;
    font-size: 30px;
    margin: 0 3px;
    box-shadow: none;
  }

  @media all and (min-width: 500px) {
    width: 80px;
    height: 80px;
    font-size: 50px;
    margin: 5px;
    box-shadow: none;
  }
`


const Log = forwardRef((props, ref) => {
    const value = useSelector((state) => state);

    answer = value.key;

    const logStyle = {
        overflow: (props.res !== "Success" && props.res !== "Failed" ? 'scroll' : 'visible'),
        maxHeight: '60%',
        scrollBehavior: "smooth"
    }

    return (
        <div style={logStyle} ref={ref}>
            {(Object.values(value.data)).map((str, idx) => <LBox key={idx}>{(str.split("")).map((c, i) => <L
                key={i} c={c} i={i} animate={{scale: [0, 1]}}
                transition={{duration: 1, delay: i / 10}}>{c}</L>)}</LBox>)}
            {props.res !== "Success" && props.res !== "Failed" ?
                <LBox><Empty/><Empty/><Empty/><Empty/><Empty/></LBox> : ""}
        </div>
    );
})

export default Log;