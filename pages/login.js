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
                <h1>Whatsapp{'  '}<img src="/whatsapp.svg" style={{ height: '30px', width: '30px', display: 'inline-block', marginBottom: '-5px'}} /> Ana Rita</h1>
                <h2>Clique abaixo para cadastrar!</h2>
                <Logo onClick={signIn}
                    src="/google-37.png"
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