import { Avatar, IconButton, Button } from "@material-ui/core"
import styled from 'styled-components';
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import SearchIcon from "@material-ui/icons/Search"
import * as EmailValidator from 'email-validator'
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";


export default function Sidebar() {

  const [user] = useAuthState(auth)

  const createChat = () => {
    const input = prompt('Por favor, Digite o endereço de Email do usuario que deseja conversar.');

    if (!input) return null;

    if (EmailValidator.validate(input)){
      // we need to add the chat into DB 'chats' collection

      db.collection('chats').add({
        users: [user.email],
      }) 

    }

  }

  return (
    <Container>
        <Header>
            <UserAvatar onClick={() => auth.signOut()} src={user.photoURL} />
            <IconsContainer>

              <IconButton>
                  <ChatIcon />
              </IconButton>

              <IconButton>
                <MoreVertIcon />
              </IconButton >

            </IconsContainer>
        </Header>

        <Search>
          <SearchIcon />
          <SearchInput placeholder="Pesquise em conversas"/>
        </Search>
        <SidebarButton>
          Comece uma nova conversa
        </SidebarButton>

        {/* lists of chats */}
    </Container>
  )
}

const Container = styled.div`


`;

const Search = styled.div`

  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 2px;
`

const SidebarButton = styled(Button)`
  width: 100%;

  &&&{
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`

const SearchInput = styled.input`

  outline-width: 0;
  border: none;
  flex: 1;
`

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid whitesmoke;
`

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover{
    opacity: 0.8;
  }

`;

const IconsContainer = styled.div`

`;