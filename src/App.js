import React, { useState,useEffect } from 'react';
import {Button,FormControl,InputLabel,Input} from '@material-ui/core'
import './App.css';
import Message from './Component/Message';
import db from './firebase';
import firebase from 'firebase'
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import PhotoIcon from '@material-ui/icons/Photo';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GifIcon from '@material-ui/icons/Gif';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
function App() {

    const [input,setInput] = useState('');
    const [messages,setMessages] = useState([]);
    const [username,setUsername] = useState('');

    useEffect(() => {
     //onSnapshot => every time the database change it run the below code
      db.collection('messages') 
      .orderBy('timestamp','desc')
      .onSnapshot(snapshot =>{
        setMessages(snapshot.docs.map(doc=>({id:doc.id,message:doc.data()})))
      })
    }, [])

    useEffect(() => { 
      const name =prompt("please enter your name");  
      setUsername(name); 
    }, [])
  
    const sendMessage = (event) =>{

      db.collection("messages").add({
        message:input,
        username:username,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
        setInput('');
        event.preventDefault()
      } 
 
  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
      <h1>Messenger app</h1>
      {username && <h2>Welcome {username}</h2>}
      <form className="app__form">
      <FormControl className="app__formControl">
        <AddCircleIcon className="app_icons"/>
        <GifIcon className="app_icons"/>
        <InsertDriveFileIcon className="app_icons"/>
        <PhotoIcon className="app_icons"/>
        <Input  className="app__input" placeholder='Enter a Messasge...'  value={input} onChange={e => setInput(e.target.value)}   />

        <IconButton className="app__iconButton" disabled={!input} variant="contained" color='primary' type="submit" onClick={sendMessage}><SendIcon className="app_sendIcon" /></IconButton>
        </FormControl>
      </form>
      <div className="app__messages">
      <FlipMove>
        {messages.map(({message,id}) => {
         return <Message key={id} username={username} message={message}/>
        })
        }
        </FlipMove></div>
    </div>
  );
}

export default App;
