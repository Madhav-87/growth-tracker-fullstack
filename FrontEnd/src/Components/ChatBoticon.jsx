import React from 'react';
import { useNavigate } from 'react-router-dom';
import './chatbot.css';
import chatBot from './chatBot.png';
export default function ChatBoticon() {
  const navigation= useNavigate();
  return (
    <div>
        <div className='d-flex chatbot-layout' >
            <img src={chatBot} className='chatbot-icon'  onClick={()=>navigation("/chatbot")}/>
        </div>
    </div>
  )
}
