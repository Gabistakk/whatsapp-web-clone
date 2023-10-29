import { useRouter } from "next/router";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, Mic, MoreVert, Send } from "@material-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { useEffect, useRef, useState, componentDidMount, componentWillUnmount } from "react";
import firebase from "firebase/compat/app";
import getRecipientEmail from "utils/getRecipientEmail";
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js'
import pt_BR from 'timeago.js/lib/lang/pt_BR'


import Picker from '@emoji-mart/react'
import EmojiPicker from "emoji-picker-react";

timeago.register('pt_BR', pt_BR)

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);

  const [input, setInput] = useState('');

  const endOfMessagesRef = useRef(null)

  const [isPickerVisible, setIsPickerVisible] = useState(false)


  const router = useRouter();
  

  const handleIsPickerVisible = () =>{
    if(isPickerVisible){
      setIsPickerVisible(false)
      return
    }
    setIsPickerVisible(true)
  }


  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  
  const scrollToBottom = () => {
    if(messagesSnapshot?.docs?.length < 5){
      endOfMessagesRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    }
    else{
      endOfMessagesRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" })

    }

  }


  const sendMessage = (e) => {
    e.preventDefault();
    if(input == ''){
      return;
    }

    db.collection("users").doc(user.uid).set({
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });


    db.collection('chats').doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
      seen: false,
    })

    setInput('');

  };



  
  const showMessages = () => {
    if (messagesSnapshot) {
      return (
        messagesSnapshot.docs.map((message) => (
        <Message
        key={message.id}
        user={message.data().user}
        message={{
          ...message.data(),
          timestamp: message.data().timestamp?.toDate().getTime(),
          }}
          chat={chat}
          messageId={message.id}
          />
          )));
          
    } else {
      return JSON.parse(messages).map(message => (
        <Message
        key={message.id}
        user={message.user}
        message={message}
        chat={chat}
        messageId={message.id}
        />
        ))
      }
    };
    

    const recipientEmail = getRecipientEmail(chat.users, user)

  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', recipientEmail)
  )

  const recipient = recipientSnapshot?.docs?.[0]?.data();


  useEffect(() => {
    scrollToBottom()
    }, [showMessages])
  

  return (
    <Container>
      <Header>
        {
          recipient ? (
            <Avatar src={recipient?.photoURL} />
          )
            :
            (
              <Avatar>{recipientEmail[0].toUpperCase()}</Avatar>
            )
        }

        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>Última vez visto: {' '}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen.toDate()} locale='pt_BR' />
              ) : "Indisponivel."}
            </p>
          ) : (
            <p>Carregando última vez ativo...</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer >
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef} />
      </MessageContainer>

      <InputContainer>
      <EmojiScreen>
      {(isPickerVisible) && <EmojiPicker onEmojiClick={(emoji) => {setInput(input + emoji.emoji)}} />}
      </EmojiScreen>
      <IconButton onClick={handleIsPickerVisible}>
        <InsertEmoticon fontSize="large" />
      </IconButton>
        <Input value={input} onChange={e => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
        <IconButton onClick={sendMessage} type="submit">
        <Send fontSize="large"/>
        </IconButton>

      </InputContainer>

    </Container>
  );

}


export default ChatScreen;

const Container = styled.div`
`;
const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;
const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 98vh;
  scroll-margin-top: 500px;
  background-image: url('/fundo.jpg');
  background-blend-mode: multiply;
  background-attachment: fixed;
`;

const EndOfMessage = styled.div`
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;	

const EmojiScreen = styled.div`
  position: absolute;
  top: -440px;
  left: 0;
`