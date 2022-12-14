import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  DeleteForever,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useStateValue } from "../contextApi/StateProvider";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      axios
        .get(`https://chatapp1997.herokuapp.com/room/${roomId}`)
        .then((response) => {
          setRoomName(response.data.name);
          setUpdatedAt(response.data.updatedAt);
        });
      axios
        .get(`https://chatapp1997.herokuapp.com/messages/${roomId}`)
        .then((response) => {
          setMessages(response.data);
        });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!input) {
      return;
    }

    await axios.post(`https://chatapp1997.herokuapp.com/messages/new`, {
      message: input,
      name: user.displayName,
      timestamp: new Date(),
      uid: user.uid,
      roomId: roomId,
    });
    setInput("");
  };

  const deleteChat = async () => {
    try {
      await axios.delete(`https://chatapp1997.herokuapp.com/chats/`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const pusher = new Pusher("ac12088e1a431ba2c5cb", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (room) {
      // alert(JSON.stringify(newMessage));
      setMessages((prevMessages) => [...prevMessages, room]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName ? roomName : "Welcome to Let's Talk"}</h3>
          <p>
            {updatedAt
              ? `Last updated at ${new Date(updatedAt).toString().slice(0, 25)}`
              : "Click on any group"}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message, index) => (
          <p
            className={`chat__message ${
              message.uid === user.uid && "chat__receiver"
            }`}
            key={message?.id ? message?.id : index}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp).toString().slice(0, 25)}
            </span>
            <span onClick={deleteChat} className="delete_icon">
              <DeleteForever />
            </span>
          </p>
        ))}
      </div>

      {roomName && (
        <div className="chat__footer">
          <InsertEmoticon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              type="text"
            />
            <button onClick={sendMessage}>Send a message</button>
          </form>
          <Mic />
        </div>
      )}
    </div>
  );
};

export default Chat;
