import React, { useState ,useEffect,useRef} from 'react';
import {useHistory} from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import './chat.css'
import Infobar from '../infobar/Infobar'
import Messages from '../messages/Messages'
import Input from '../input/Input'
import Users from '../users/Users'
let socket;
const ENDPOINT='localhost:5000'
var connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000,                  
  "transports" : ["websocket"]
};

export const Chat=({location},props)=>{
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    // let val=false;
    const history = useHistory()

    const valid=()=>history.push("/")
        
    useEffect(()=>{
      const {name,room}=queryString.parse(location.search)
      setName(name)
      setRoom(room)
     
      socket = io(ENDPOINT,connectionOptions);
      // console.log(socket)
       
      socket.emit('join',{name,room},(err)=>{
        socket.disconnect()
         valid()
      })

    },[ENDPOINT],location.search)
   
  

    useEffect(()=>{
      socket.on('message',message=>{
        setMessages( messages=>[...messages,message])
         
      })

       
      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
     
    },[])

   
    const sendMessage=(e)=>{
      e.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>setMessage('')
            )
            
        }
    }


    const crossRef=useRef();
    const slideRef=useRef();
    let cross=()=>{
      // console.log(crossRef.current)
      slideRef.current.style.width="0"
    }
    function slide(){
      // console.log(slideRef.current)
      slideRef.current.style.width="220px"
    }
   
    
    
    // console.log(messages)
    return (
      <div className="outerContainer">
        <div className="container">

          <div className="room-info"> 
            <span className="p" > <a href="#" id="slide"><i className="fa fa-bars  " onClick={slide} ></i></a></span>
            <div className="menu" ref={slideRef}>
                <div className="cross" ref={crossRef} onClick={cross}><i className="fa fa-times fa-1x"></i></div>
                <div className="room-icon"><i className="fa fa-comments fa-2x"></i><span id="b">room-name</span> </div>
                <div className="roomnames">{room}</div>
                <div className="mem"><i className="fa fa-users fa-3x"></i><span id="b">members</span></div>
                  <Users users={users} className="member"/>
            </div>
          </div>
          
          <Infobar room={room}/>
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/> 
       </div>
      </div>
    );
   
}

export default  (Chat);