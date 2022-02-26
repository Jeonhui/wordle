import styled, {css} from "styled-components";


const InfoContainer = styled.div`
  position: absolute;
  display: inline-block;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  height: 265px;
  background-color: white;
  border-radius: 5px;
  text-align: center;
  vertical-align: middle;
  ${props =>
          (props.over === "out") && css`
            display: none;
          `
  }
`
const Table = styled.table`
  position: absolute;
  width: 100%;
  padding-left: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
`

const ColorBox = styled.td`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  ${props => props.color}
`

const Explanation = styled.td`
  height: 50px;
  width: 500px;
  text-align: left;
  padding-left: 10px;
`


function Info(props) {
    return (
        <InfoContainer over={props.over}>
            <Table>
                <thead>
                <tr>
                    <th colSpan={2} style={{fontSize: "20px", marginBottom:"10px"}}>Guide</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <ColorBox color={css`background-color: rgb(140, 210, 130);`}/>
                    <Explanation> The character is included in answer.<br/>
                        The character position is correct. </Explanation>
                </tr>
                <tr>
                    <ColorBox color={css`background-color: rgb(255, 212, 100);`}/>
                    <Explanation>The character is included in answer.</Explanation>
                </tr>
                <tr>
                    <ColorBox color={css`background-color: rgb(255, 141, 141);`}/>
                    <Explanation>The character isn't included in answer.</Explanation>
                </tr>
                </tbody>
            </Table>
        </InfoContainer>
    );
}

export default Info;