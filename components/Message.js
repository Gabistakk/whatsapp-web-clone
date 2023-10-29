import moment from "moment-timezone";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { useEffect } from "react";
import useWindowFocus from "use-window-focus";


function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);

  const windowFocused = useWindowFocus();
 
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;

  const TypeOfTimeStamp = user === userLoggedIn.email ? TimeStampSender : TimeStampReceiver;

  useEffect(() => {
    if(message?.seen == false && !windowFocused){
      new Audio('/alert1.mp3').play();
      console.log(message.seen)
    }
    message.seen = true;
}, [])

  return (
    <Container>
      <TypeOfMessage>{message.message}
      <TypeOfTimeStamp>{message.timestamp ? moment(message.timestamp).tz('America/Sao_Paulo').format('LT') : '...'}</TypeOfTimeStamp>
      </TypeOfMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 25px;
  padding-top: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 40px;
  font-size: 20px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`

const Receiver = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`

const TimeStampSender = styled.span`
  color: gray;
  padding: 18px;
  font-size: 15px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`

const TimeStampReceiver = styled.span`
  color: gray;
  padding: 18px;
  font-size: 15px;
  position: absolute;
  bottom: 0;
  text-align: right;
  left: 0;
`