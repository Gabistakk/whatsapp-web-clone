import styled from "styled-components"
import Head from 'next/head';
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase"

export default function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }


    return (
        <Container>
            <Head>
                <title>
                    Login Whatsapp Ana Rita
                </title>
            </Head>

            

            <LoginContainer>
                <WhatsappsContainer>
                    <WhatsappText>Whatsapp Web</WhatsappText>
                    <WhatsappIcon src="https://cdn-icons-png.flaticon.com/512/2585/2585165.png" />
                </WhatsappsContainer>
                <EntreText>Entre para começar a conversar!</EntreText>
                <SignInWithGoogle onClick={signIn}>Entre com sua conta Google</SignInWithGoogle>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: '70%'}}>
                <EntreText>Duvidas, entre em contato via e-mail: gabriel@emerenciano.dev</EntreText>
                </div>
            </LoginContainer>
            <SpaceDiv>
            
            </ SpaceDiv>
        </Container>
    )
}


const Container = styled.div`
    display: flex;
    justify-content: end;
    height: 100vh;
    width: 100vw;
    background-image: url('https://wallpapercave.com/wp/wp8786419.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
`

const LoginContainer = styled.div`
    height: 100%;
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding-top: 5%;
    gap: 10%;
    border-radius: 5px;
    background-color: rgb(245,245,245, 0.95);
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
     box-sizing: border-box; 










    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
`
const WhatsappsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: max-content;
    gap: 5%;
`
const WhatsappText = styled.h1`
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    color: #075E54;
    font-size: 50px;
`

const EntreText = styled.h1`
    font-family: "Roboto", sans-serif;
    font-size: 35px;
    font-weight: 700;
    margin-top: 5%;
`
const SpaceDiv = styled.div`
    width: 25%;
`
const WhatsappIcon = styled.img`
    height: 100%;
    width: 15%;
`

const SignInWithGoogle = styled.button`
    margin-top: 5%;

    width: 60%;
    height: 16%;

    transition: background-color .3s, box-shadow .3s;
    
    padding: 12px 16px 12px 150px;
    border: none;
    border-radius: 3px;
    box-shadow: 0 -3px 0 rgba(0, 0, 0, .04), 0 3px 3px rgba(0, 0, 0, .25);
    
    color: #757575;
    font-size: 30px;
    font-weight: 500;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
    
    background-image: url('https://t.ctcdn.com.br/lvns56iaSMyHvyTur4JeYS_NYeY=/i606944.png');
    background-color: white;
    background-repeat: no-repeat;
    background-position: 12px 11px;
    background-size: 30%;
    
    &:hover {
      box-shadow: 0 -3px 0 rgba(0, 0, 0, .04), 0 5px 8px rgba(0, 0, 0, .25);
    }
`