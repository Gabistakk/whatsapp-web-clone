import { Html, Head, Main, NextScript, h2, div, a } from 'next/document'
import styled from "styled-components"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href="/favicon.ico" sizes='any'/>
</Head>
      <body>
      <a href='https://emerenciano.dev' target='_blank'>
      <div style={TagCardStyle}>
        <h2 style={fontStyle}>Made By:</h2>
        <div style={{display: 'flex', gap: '5px'}}>
        <h2 style={nameFontStyle}>Gabriel Emerenciano</h2>
        <img style={{ height: '30px', width: '30px'}} src='/terminal.svg'/>
        </div>
      </div>
      </a>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

const TagCardStyle = {
  position: 'absolute',
  top: '0',
  right: '0',
  marginRight: '5vw',
  marginTop: '5vh',
  zIndex: '1000',

  backgroundColor: 'rgb(10, 10, 10, 0.9)',

  height: '13vh',
  width: '15vw',
  gap: '1vh',
  borderRadius: '30px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',

  fontFamily: 'monospace',
  cursor: 'pointer',
  fontSize: '15px',
}

const fontStyle = {
  color: 'white',
  marginTop: '-5%',
}
const nameFontStyle = {
  color: 'rgb(35, 225, 14)',
}