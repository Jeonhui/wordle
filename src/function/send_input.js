export const send_input = (text) =>({
    type: "send_input",
    text: (text[0]+text[1]+text[2]+text[3]+text[4]).toLowerCase()
})//Store로 데이터를 보내는 함수