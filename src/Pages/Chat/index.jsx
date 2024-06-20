import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer/Index';
import person from '../../Assets/image.png';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from '@emotion/css';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';
import axios from 'axios';

const Index = ({ socket }) => {
    const [params, setParams] = useSearchParams();
    const id = useSelector(state => state.id);
    const token = useSelector((state) => state.userID);
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState({ user1: '', user2: '' });
    const [selectedChatDetails, setSelectedChatDetails] = useState(null);
    const [cmessage, setCMessage] = useState('');
    const today = new Date().toISOString().slice(0, 10);
    const [lastDate, setLastDate] = useState(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (params.get('user')) {
            socket.emit('createMessage', { senderId: params.get('user'), receiverId: id });
        }
    }, [params, id, socket]);

    useEffect(() => {
        socket.on('newMessage', (data) => {
            setMessages(data)
        })
    })
    const fetchProfile = async (userId, type) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}`, {
                headers: { Authorization: token },
            });
            const profile = res.data.data[0];
            return { userId, type, profile };
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    useEffect(() => {
        socket.emit('getMessagesList', { id });
    }, [socket, id, token]);

    useEffect(() => {
        socket.on('messagesList', async (data) => {
            const updatedMessages = [];
            for (const message of data) {
                const senderProfile = await fetchProfile(message.senderId, 'sender');
                const receiverProfile = await fetchProfile(message.receiverId, 'receiver');
                updatedMessages.push({
                    ...message,
                    senderName: senderProfile ? senderProfile.profile?.name : '',
                    senderPic: senderProfile ? senderProfile.profile?.image : '',
                    receiverName: receiverProfile ? receiverProfile.profile?.name : '',
                    receiverPic: receiverProfile ? receiverProfile.profile?.image : '',
                });
            }
            setMessages(updatedMessages);
            if (params.get('user')) {
                updatedMessages.map((Item) => {
                    if ((Item.senderId === id && Item.receiverId == params.get('user')) || Item.senderId === params.get('user') && Item.receiverId === id) {
                        setSelectedChat({
                            user1: Item.senderId,
                            user2: Item.receiverId
                        }); setSelectedChatDetails(Item)
                    }
                })
            }
        });
    })
    const sendMessage = () => {
        if (!cmessage.length) return;
        socket.emit('sendMessage', { senderId: selectedChat.user1, receiverId: selectedChat.user2, message: cmessage, senderId1: id });
        const chatIndex = messages.findIndex(msg => (msg.senderId === selectedChat.user1 && msg.receiverId === selectedChat.user2) || (msg.senderId === selectedChat.user2 && msg.receiverId === selectedChat.user1));
        const updatedMessage = [...messages];
        updatedMessage[chatIndex]?.messages.push({ message: cmessage, senderId: id, time: new Date().toISOString() });
        setMessages(updatedMessage);
        setSelectedChatDetails(updatedMessage[chatIndex]);
        setCMessage('');
    };

    useEffect(() => {
        const handleReceivedMessage = (data) => {
            setTimeout(() => {
                if (messages.length > 0) {
                    const tempmessages = [...messages];
                    const chatIndex = tempmessages.findIndex(msg => (msg.senderId === data.senderId && msg.receiverId === data.receiverId) || (msg.senderId === data.receiverId && msg.receiverId === data.senderId));
                    if (chatIndex !== -1) {
                        tempmessages[chatIndex]?.messages.push({ message: data?.message?.message, senderId: data.senderId1, time: data?.message?.time });
                        setMessages(tempmessages);
                        setSelectedChatDetails(tempmessages[chatIndex]);
                    }
                }
            }, 1000);
        };
        socket.on('recievedMessage', handleReceivedMessage);
        return () => {
            socket.off('recievedMessage', handleReceivedMessage);
        };
    }, [socket, messages]);

    const ROOT_CSS = css({
        height: 600,
        width: '100%'
    });

    let prevDate = null;
    return (
        <div>
            <Navbar />
            <div className="main-chat mx-0 lg:mx-10 md:p-10 p-0 my-10 relative">
                <div className='sub-chat flex m-3 w-auto min-h-[100vh] bg-slate-900 relative'>
                    {
                        (screenWidth > 900 || showChat) && (<div className='left-side-bar bg-slate-200 mr-10 z-10' style={{ padding: "20px", width: "100%", maxWidth: `${showChat && screenWidth < 900 ? "100%" : screenWidth < 300 ? '440px' : screenWidth < 900 ? '360px' : '440px'}`, borderTopLeftRadius: "16px", borderBottomLeftRadius: "16px", top: `${screenWidth < 700 ? '-20px' : ''}`, left: '-15px', position: `${screenWidth < 700 ? "absolute" : ""}` }}>
                            <div className='user-chat-list relative' >
                                {(showChat && screenWidth < 900) && <X onClick={() => { setShowChat(!showChat) }} style={{ color: "black", position: "absolute", right: "10px", top: '5px', cursor: "pointer" }} />}
                                {
                                    (!showChat || screenWidth > 900) && <h1 className='text-xl font-semibold pb-10 pt-3 my-10' style={{ fontSize: "32px", margin: "0px 0" }}>Messages</h1>
                                }
                                <div style={{ border: "2px solid #ccc", boxShadow: "0 4px 13px 0 rgba(0, 0, 0, 0.6)", height: "680px", padding: "20px" }} >
                                    {
                                        messages?.map((Item, index) => (
                                            <div key={index} className='flex text-center items-center max-w-10 my-4 cursor-pointer' style={{ border: "1px solid #000", padding: '10px', backgroundColor: `${selectedChat.user1 ? selectedChatDetails._id === Item._id ? "#01A664" : "#fff" : "#fff"}` }} onClick={() => {
                                                setSelectedChat({
                                                    user1: Item.senderId,
                                                    user2: Item.receiverId
                                                }); setSelectedChatDetails(Item)
                                                setShowChat(showChat ? false : showChat)
                                            }}>
                                                <img className='rounded-lg' style={{ width: "40px" }} src={Item.senderId === id ? Item.receiverPic ? Item.receiverPic : person : Item.senderPic ? Item.senderPic : person} alt='person' />
                                                <div className='flex justify-center items-start flex-col ml-2 py-2'>
                                                    <h1 className='font-mono text-lg font-semibold' style={{ color: `${selectedChat.user1 ? selectedChatDetails._id === Item._id ? "#fff" : "#000" : "#000"}`, marginLeft: "10px", fontSize: "16px" }}>{Item.senderId === id ? Item.receiverName : Item.senderName}</h1>
                                                    <p className='ml-2' style={{ color: `${selectedChat.user1 ? selectedChatDetails._id === Item._id ? "#fff" : "#000" : "#000"}`, marginLeft: "10px", fontSize: "14px" }}>{messages[index]?.messages[messages[index]?.messages.length - 1]?.message?.slice(0, 27)}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        )
                    }
                    <div className='right-chat-bar w-full sm:w-[100%] relative' style={{ backgroundColor: "#fff", boxShadow: "0 4px 13px 0 rgba(0, 0, 0, 0.6)", border: "1px solid #ccc", marginLeft: '4px', marginRight: '4px' }}>
                        {
                            (!showChat && screenWidth < 900) && <Menu onClick={() => { setShowChat(!showChat) }} style={{ color: "black", position: "absolute", right: "10px", top: '30px', cursor: "pointer" }} />
                        }
                        {!showChat && selectedChat.user1 && selectedChat.user2 ? <>
                            <div className='bg-[#01A664] text-white px-4 py-2 user-detail border-b-2 mb-7' style={{ padding: "10px 20px" }}>
                                <div className='flex text-center items-center w-100 my-4'>
                                    <img className='mr-3 h-30 rounded-sm' style={{ width: "40px" }} src={selectedChatDetails.senderId === id ? selectedChatDetails.receiverPic ? selectedChatDetails.receiverPic : person : selectedChatDetails.senderPic ? selectedChatDetails.senderPic : person} alt='person' />
                                    <div className='flex justify-center items-start flex-col ml-2'>
                                        <h1 className='font-mono text-lg font-semibold text-blue-500'>{selectedChatDetails.senderId === id ? selectedChatDetails.receiverName : selectedChatDetails.senderName}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='chat-message h-[100%]' style={{ padding: "10px 0 0 20px" }}>
                                <ScrollToBottom className={ROOT_CSS}>
                                    <div className="chat">
                                        {
                                            selectedChatDetails?.messages?.map((Item, index) => {
                                                const messageDate = new Date(Item.time).toLocaleDateString();
                                                const isToday = messageDate === new Date().toLocaleDateString();
                                                const renderDate = messageDate !== prevDate;
                                                prevDate = messageDate;
                                                return (
                                                    <div key={index}>
                                                        {renderDate && (
                                                            <>
                                                                {isToday && <p style={{ color: "#000000", fontSize: "16px", textAlign: "center", fontWeight: "bold" }}>Today</p>}
                                                                {!isToday && <p style={{ color: "#000000", fontSize: "16px", textAlign: "center", fontWeight: "bold" }}>{messageDate}</p>}
                                                            </>
                                                        )}
                                                        {
                                                            Item?.senderId !== id ? (<div className="flex items-center my-5" style={{ marginTop: "20px", marginBottom: "20px" }}>
                                                                <img className='rounded-full' style={{ width: "20px" }} src={Item.senderId === selectedChatDetails.senderId ? selectedChatDetails.senderPic ? selectedChatDetails.senderPic : person : selectedChatDetails.receiverPic ? selectedChatDetails.receiverPic : person} alt='person' />
                                                                <div style={{ maxWidth: "530px", backgroundColor: "#BDFFC0", borderRadius: "10px", marginLeft: "4px" }}>
                                                                    <div className="message max-w-[300px] px-3 py-1 text-gray-700 bg-slate-900">
                                                                        <p className="text">{Item.message}</p>
                                                                    </div>
                                                                </div>
                                                            </div>) : (<div key={index} className="flex justify-end items-center mx-10" style={{ marginTop: "20px", marginBottom: "20px" }}>
                                                                <div style={{ maxWidth: "530px", backgroundColor: "#D9D9D9", borderRadius: "10px", marginLeft: "4px" }}>
                                                                    <div className="message px-3 py-1 text-gray-700 bg-slate-900" style={{ color: "#000", }}>
                                                                        <p className="text">{Item.message}</p>
                                                                    </div>
                                                                </div>
                                                                <img className='rounded-full' style={{ width: "20px", marginLeft: "10px" }} src={Item.senderId === selectedChatDetails.senderId ? selectedChatDetails.senderPic ? selectedChatDetails.senderPic : person : selectedChatDetails.receiverPic ? selectedChatDetails.receiverPic : person} alt='person' />
                                                            </div>)
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </ScrollToBottom>
                                <div className='type-message flex flex-row flex-wrap justify-center items-center md:justify-between items-center p-3 bg-slate-200'>
                                    <input onChange={(e) => { setCMessage(e.target.value) }} type="text" placeholder="Write a message" className="flex-1 outline-none border-none p-2 rounded-l-lg mr-2" style={{ border: "1px solid #ccc", backgroundColor: '#D9D9D9', padding: "10px 26px 10px 26px", borderRadius: "10px", maxWidth: "630px", fontSize: "16px" }} value={cmessage} />
                                    <button onClick={sendMessage} style={{ backgroundColor: "#01A664", borderRadius: "25px", gap: "10px", padding: "10px 26px 10px 26px", minWidth: "100px" }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg md:ml-4 mt-2 md:mt-0">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </> : (!showChat || selectedChat > 900) && <div className='flex justify-center items-center h-[100%]'>
                            <p className="text-2xl font-semibold">Welcome to Rentmyitem</p>
                        </div>
                        }
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: "150px" }}></div>
            <Footer />
        </div>
    )
}

export default Index