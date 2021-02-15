import { Avatar } from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactTimeago from 'react-timeago';
import './Chat.css';
import { selectImage } from './features/appSlice';
import { db } from './firebase';

function Chat({ id, profilePic, userName, timestamp, imageUrl, read }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));

      db.collection("posts").doc(id).set(
        {
          read: true,
        }, 
        { merge: true }
      )

      history.push("/chats/view");
    }
  };

  return (
    <div className="chat" onClick={open}>
      <Avatar className="chat__avatar" src={profilePic}/>

      <div className="chat__info">
        <h4>{userName}</h4>
        <p>
          { !read && "Tap to view -" }{" "}
          <ReactTimeago date={timestamp?.toDate().toUTCString()}/>
        </p>
      </div>

      { !read && <StopRoundedIcon className="chat__readIcon"/> }
    </div>
  )
}

export default Chat;
