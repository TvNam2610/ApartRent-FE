import { useState } from 'react';
import './Chat.scss';

function Chat() {
    const [chat, setChat] = useState(true);
    return (
        <div className="chat">
            <div className="messages">
                <h1>Messages</h1>
                <div className="message">
                    <img src="https://www.dotproperty.com.vn/img/no_image.png" alt="" />
                    <span>Nam Tran</span>
                    <p>Lorem, ipsum dolor sit amet ...</p>
                </div>
                <div className="message">
                    <img src="https://www.dotproperty.com.vn/img/no_image.png" alt="" />
                    <span>Nam Tran</span>
                    <p>Lorem, ipsum dolor sit amet ...</p>
                </div>
                <div className="message">
                    <img src="https://www.dotproperty.com.vn/img/no_image.png" alt="" />
                    <span>Nam Tran</span>
                    <p>Lorem, ipsum dolor sit amet ...</p>
                </div>
                <div className="message">
                    <img src="https://www.dotproperty.com.vn/img/no_image.png" alt="" />
                    <span>Nam Tran</span>
                    <p>Lorem, ipsum dolor sit....</p>
                </div>
                <div className="message">
                    <img src="https://www.dotproperty.com.vn/img/no_image.png" alt="" />
                    <span>Nam Tran</span>
                    <p>Lorem, ipsum dolor sit....</p>
                </div>
                <div className="message">
                    <img src="https://www.dotproperty.com.vn/img/no_image.png" alt="" />
                    <span>Nam Tran</span>
                    <p>Lorem, ipsum dolor sit....</p>
                </div>
            </div>
            {chat && (
                <div className="chatBox">
                    <div className="top">
                        <div className="user">
                            <img src="https://www.dotproperty.com.vn/img/no_image.png" alt="" />
                            Nam Tran
                        </div>
                        <span className="close" onClick={() => setChat(null)}>
                            X
                        </span>
                    </div>
                    <div className="center">
                        <div className="chatMessage">
                            <p>Lorem ipsum, dolor sit amet </p>
                            <span>1 hour ago</span>
                        </div>
                        <div className="chatMessage own ">
                            <p>Lorem ipsum, dolor sit amet </p>
                            <span>1 hour ago</span>
                        </div>
                        <div className="chatMessage">
                            <p>Lorem ipsum, dolor sit amet </p>
                            <span>1 hour ago</span>
                        </div>
                        <div className="chatMessage own">
                            <p>Lorem ipsum, dolor sit amet </p>
                            <span>1 hour ago</span>
                        </div>
                        <div className="chatMessage">
                            <p>Lorem ipsum, dolor sit amet </p>
                            <span>1 hour ago</span>
                        </div>
                        <div className="chatMessage own">
                            <p>Lorem ipsum, dolor sit amet </p>
                            <span>1 hour ago</span>
                        </div>

                        <div className="chatMessage ">
                            <p>Lorem ipsum, dolor sit amet </p>
                            <span>1 hour ago</span>
                        </div>
                        <div className="chatMessage own">
                            <p>Lorem ipsum, dolor sit amet </p>
                            <span>1 hour ago</span>
                        </div>
                    </div>
                    <div className="bottom">
                        <textarea name="" id=""></textarea>
                        <button>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chat;
