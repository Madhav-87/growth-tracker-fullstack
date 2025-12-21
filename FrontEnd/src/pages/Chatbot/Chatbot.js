import chatBot from '../../assets/images/chatBot.png';
import './chatbot.css';
import head from '../../assets/images/head.png';
import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Drawer from '../../components/common/Drawer.jsx';
import Footer from '../../components/layout/Footer.jsx';
export default function Chatbot() {
    const token=localStorage.getItem("token");
    const [messages, setMessages] = useState([
        { role: "ai", text: "Hi! I'm your growth coach. How can I help today?" }
    ]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        const text = input.trim();
        if (!text) return;
        setMessages(prev=>[...prev,{role:"user",text:text}]);
        axios.post(`${process.env.REACT_APP_API_URL}/chatbot`,{history:messages,data:text},{
            headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            setMessages(prev=>[...prev,{role:"ai",text:res.data.data}]);
        }).catch((err)=>{
            console.log(err);
        })
        setInput("");
        return;
        // const aiText = "This is a demo reply 🙂. Connect Gemini API here.";

        // setTimeout(() => {
        //     setMessages(prev => [...prev, { role: "ai", text: aiText }]);
        // }, 500);
    };
    const chatMessagesRef = useRef(null);

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages.length]); // Only trigger when message count changes

    return (
        <div className="chatbot-body">
            <Drawer/>
            <header>
                <div className='chatbot-header'>
                    <div className='pe-2 ps-2'>
                        <img src={chatBot} className='ai-icon' />
                    </div>
                    <div>
                        <div className='header-heading'>
                            AI Growth Coach
                        </div>
                        <div className='header-subtxt'>
                            personal development companion
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className='chat-panel'>
                    <div className='chats' ref={chatMessagesRef}>
                        {
                            messages.map((value, index) => {
                                return value.role === "user"
                                    ?
                                    (<div key={index}  className='user-message'>
                                        <div className='user-messagebox'>
                                           <div>{value.text}</div>
                                        </div>
                                        <div >
                                             <span className="material-symbols-outlined" >
                                                contacts_product
                                            </span>
                                        </div>
                                    </div>)
                                    :
                                    (<div key={index} className='ai-message'>
                                        <div className='avtar'>
                                            <img src={head} style={{ height: "40px", width: "40px" }} />
                                        </div>
                                        <div className='ai-messagebox'>
                                            <div>
                                                 <ReactMarkdown>{Array.isArray(value.text) ? value.text.join('') : value.text}</ReactMarkdown>
                                            </div>
                                        </div>
                                    </div>)
                            })
                        }

                    </div>
                    <div className='chat-input-box'>
                        <input type="text" placeholder="Share what's on your mind"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && sendMessage()}
                        ></input>
                        <button onClick={sendMessage}><span className="material-symbols-outlined">
                            arrow_upward
                        </span></button>
                    </div>
                </div>
                <div>
                    <div>

                    </div>
                    <div className='focus-area'>
                        <div className='focus-heading'>
                            <span className="material-symbols-outlined me-2" style={{ fontSize: "40px" }}>
                                target
                            </span>
                            <span style={{ color: "black", fontWeight: "700" }}>
                                Focus Area
                            </span>
                        </div>
                        <div className='box-container'>
                            <div className='box-icons'>
                                <span className="material-symbols-outlined">
                                    auto_stories
                                </span>
                            </div>
                            <div className='box-text'>
                                <div style={{ fontWeight: "700" }}>
                                    Learning
                                </div>
                                <div style={{ color: "grey" }}>
                                    Continuous education
                                </div>
                            </div>
                        </div>
                        <div className='box-container'>
                            <div className='box-icons'>
                                <span className="material-symbols-outlined">
                                    favorite
                                </span>
                            </div>
                            <div className='box-text'>
                                <div style={{ fontWeight: "700" }}>
                                    Wellness
                                </div>
                                <div style={{ color: "grey" }}>
                                    Mind & body health
                                </div>
                            </div>
                        </div>
                        <div className='box-container'>
                            <div className='box-icons'>
                                <span className="material-symbols-outlined">
                                    neurology
                                </span>
                            </div>
                            <div className='box-text'>
                                <div style={{ fontWeight: "700" }}>
                                    Mindset
                                </div>
                                <div style={{ color: "grey" }}>
                                    Mental framework
                                </div>
                            </div>
                        </div>
                        <div className='box-container'>
                            <div className='box-icons'>
                                <span className="material-symbols-outlined">
                                    electric_bolt
                                </span>
                            </div>
                            <div className='box-text'>
                                <div style={{ fontWeight: "700" }}>
                                    Productivity
                                </div>
                                <div style={{ color: "grey" }}>
                                    Efficiency & focus
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='message-box'>
                        <div>
                            <span className="material-symbols-outlined">
                                stars_2
                            </span>
                        </div>
                        <div style={{ fontWeight: "700" }}>
                            Toady's Inspiration
                        </div>
                        <div>
                            "The only way to do great work is to love what you do. Keep pushing forward, one step at a time."
                        </div>
                    </div>
                    <div className='message-box2'>
                        <div>
                            <span className="material-symbols-outlined">
                                bolt
                            </span>
                        </div>
                        <div style={{ fontWeight: "700" }}>
                            Coach Tip
                        </div>
                        <div>
                            Start each conversation by sharing your current challenge or goal. The more specific you are, the better I can help you!
                        </div>
                    </div>
                </div>
            </main>
           <Footer/>
        </div>
    )
}
