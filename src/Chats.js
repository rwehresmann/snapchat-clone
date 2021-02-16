import { Avatar } from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react'
import './Chats.css'
import { auth, db } from './firebase';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const history = useHistory();
  const disptach = useDispatch();

  const takeSnap = () => {
    disptach(resetCameraImage())
    history.push("/");
  };

  // To know more why isMounted is used below, 
  // check https://stackoverflow.com/a/60907638/5261664 
  useEffect(() => {
    let isMounted = true;

    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => (
          {
            id: doc.id,
            data: doc.data(),
          }
        )))
      );

      return () => { isMounted = false };
  }, []);

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar 
          src={user.profilePic} 
          className="chats__avatar" 
          onClick={() => auth.signOut()}
        />
        
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon"/>
          <input type="text" placeholder="Friends"/>
        </div>

        <ChatBubbleIcon className="chats__chatIcon"/>
      </div>

      <div className="chats__posts">
        {posts.map(({id, data: { profilePic, userName, timestamp, imageUrl, read }}) => (
          <Chat
            key={id}
            id={id}
            userName={userName}
            timestamp={timestamp}
            imageUrl={imageUrl}
            read={read}
            profilePic={profilePic}
          />
        ))}
      </div>

      <RadioButtonUncheckedIcon
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  )
}

export default Chats;
