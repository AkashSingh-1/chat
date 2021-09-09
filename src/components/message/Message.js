import React from 'react';

import './message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user,time }, name  }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }
   
  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          
          <div className="messageBoxr backgroundBlue">
          <p className="nameTop"> {trimmedName}</p>
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
            <p className="time">{time}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
            <p className=" nameTop color"> {user}</p>
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
              <p className="time">{time}</p>
            </div>
           
          </div>
        )
  );
}

export default Message;