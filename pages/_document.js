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
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
</Head>
      <body>
      <a href='https://emerenciano.dev' target='_blank'>
      <div style={TagCardStyle}>
        <h2 style={fontStyle}>Made By:</h2>
        <h2 style={nameFontStyle}>Gabriel Emerenciano</h2>
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