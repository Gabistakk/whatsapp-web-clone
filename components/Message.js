import moment from "moment-timezone";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { useEffect } from "react";
import useWindowFocus from "use-window-focus";
import { DoneAll } from "@material-ui/icons";

function Message({ user, message, chat, messageId }) {
  const [userLoggedIn] = useAuthState(auth);

  const windowFocused = useWindowFocus();
 
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;

  const TypeOfTimeStamp = user === userLoggedIn.email ? TimeStampSender : TimeStampReceiver;

/*   useEffect(() => {
    if(message?.seen == false && !windowFocused){
      new Audio('/alert1.mp3').play();
    }
    
}, []) */

  useEffect(() => {
    if(user != userLoggedIn.email && message.seen == false && windowFocused == true){
      db.collection("chats").doc(chat.id).collection("messages").doc(messageId).set({
        seen: true,
      }, { merge: true });
    }
  }, [windowFocused])


  return (
    <Container>
      <TypeOfMessage>{message.message}
      <TypeOfTimeStamp>{message.timestamp ? moment(message.timestamp).tz('America/Sao_Paulo').format('LT') : '...'}</TypeOfTimeStamp>
      {(user === userLoggedIn.email) && (message.seen == false) && <CheckMark />}
      {(user === userLoggedIn.email) && (message.seen == true) && <CheckMarkSeen />}
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
  min-width: 80px;
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
  margin-right: 30px;
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


const CheckMark = styled(DoneAll)`
  color: gray;
  padding: 18px;
  font-size: 15px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`

const CheckMarkSeen = styled(CheckMark)`
  color: #4FB6EC;
`