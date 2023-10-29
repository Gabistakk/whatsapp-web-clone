import { Avatar } from "@material-ui/core"
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components"
import getRecipientEmail from "../utils/getRecipientEmail"
import { auth, db } from "../firebase"
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useWindowFocus from "use-window-focus";
import { sortedLastIndex } from "lodash";


function Chat({ id, users }) {

    const router = useRouter();

    const [user] = useAuthState(auth);

  const windowFocused = useWindowFocus();


    const [unseenQuantity, setUnseenQuantity] = useState(0);

    const [lastMessage, setLastMessage] = useState('');

    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(users, user)))

    const [messagesUnseenSnapshot] = useCollection(
        db
          .collection("chats")
          .doc(id)
          .collection("messages")
          .where('seen', '==', false)
      )

      const [messagesSnapshot] = useCollection(
        db
          .collection("chats")
          .doc(id)
          .collection("messages")
          .orderBy('timestamp', 'desc')
      )

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data();

    const recipientEmail = getRecipientEmail(users, user);


    useEffect(() => {
        setUnseenQuantity(0);
        setLastMessage('');
        if(messagesUnseenSnapshot){
            messagesUnseenSnapshot?.docs.map((message) => {
                if(user.email != message.data().user){
                    setUnseenQuantity(messagesUnseenSnapshot?.docs.length)
                    setLastMessage(messagesSnapshot?.docs?.[0]?.data().message)
                }
            })
            }
            
    }, [messagesUnseenSnapshot])

    useEffect(() => {
        if(!windowFocused && unseenQuantity >= 1){
            new Audio('/alert1.mp3').play();
          }
    }, [unseenQuantity])

    return (
    <Container onClick={enterChat}>
        {recipient ? (
            <UserAvatar src={recipient?.photoURL}/>)
            :
            (<UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar>)
            }
        <p>{recipientEmail}</p>
        {(lastMessage != '') && <Message>{lastMessage}</Message>}
        {(unseenQuantity > 0) && <Unread>{unseenQuantity}</Unread>}
    </Container>
  )
}

export default Chat

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;

    &:hover {
        background-color: #e9eaeb;
    }
  position: relative;
`

const Unread = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00a884;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    position: absolute;
    right: 0;
    margin-right: 10px;
`

const Message = styled.div`
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;


    align-items: left;

    color: gray;

    justify-content: left;
    bottom: 5%;
    right: 20%;

    width: 200px;
  position: absolute;

`

const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`