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
                <h1>Whatsapp Ana Rita</h1>
                <h2>Clique na logo abaixo!</h2> <h3 style={{ display: 'inline' }}>(login com o Google)</h3>
                <Logo onClick={signIn}
                    src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
                />
            </LoginContainer>


        </Container>
    )
}


const Container = styled.div`
    display: grid;
    place-items: center;
    height: 98vh;
    background-color: whitesmoke;
`

const LoginContainer = styled.div`
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`

const Logo = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
    cursor: pointer;
`