import apiRequest from '../../lib/apiRequest';
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { SocketContext } from '../../context/SocketContext';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBTypography,
    MDBInputGroup,
} from 'mdb-react-ui-kit';
import './Chat.scss';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { fToNow } from '../../lib/formatTime';

export default function App() {
    const { currentUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    const location = useLocation(); // Dùng để nhận state từ trang Detail
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');
    const [receiver, setReceiver] = useState(null);

    // Hàm lấy danh sách chat từ API
    const fetchChats = async () => {
        try {
            const response = await apiRequest('/chat');
            setChats(response.data); // Lưu dữ liệu chat vào state
        } catch (error) {
            console.error('There was an error fetching chats:', error);
        }
    };

    // Hàm lấy thông tin cuộc trò chuyện chi tiết
    const fetchChatDetails = async (chatId) => {
        try {
            await apiRequest.put(`/chat/read/${chatId}`);
            const response = await apiRequest(`/chat/${chatId}`);
            console.log(response.data);

            setSelectedChat(response.data);

            setReceiver(response.data?.receiver);
        } catch (error) {
            console.error('There was an error fetching chat details:', error);
        }
    };

    // Khi có dữ liệu từ Detail, tự động mở chat
    useEffect(() => {
        const chatIdFromDetail = location.state?.chatId; // Nhận chatId từ Detail
        const receiverIdFromDetail = location.state?.receiverId; // Nhận receiverId từ Detail

        if (chatIdFromDetail) {
            fetchChatDetails(chatIdFromDetail);
        } else if (receiverIdFromDetail) {
            // Tìm hoặc tạo chat với receiver từ Detail
            apiRequest.post('/chat', { receiverId: receiverIdFromDetail }).then((response) => {
                fetchChatDetails(response.data.id);
            });
        }
    }, [location]);

    // Hàm gửi tin nhắn
    const sendMessage = async () => {
        if (message.trim() === '' || !selectedChat) return;

        try {
            const response = await apiRequest.post(`/message/${selectedChat.id}`, {
                text: message,
            });

            setSelectedChat((prevChat) => ({
                ...prevChat,
                messages: [...prevChat.messages, response.data],
            }));

            setMessage(''); // Xóa input sau khi gửi
            socket.emit('sendMessage', {
                receiverId: receiver.id,
                data: response.data,
            });
        } catch (error) {
            console.error('There was an error sending the message:', error);
        }
    };

    // Khi component mount, lấy danh sách chat
    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <MDBContainer fluid className="py-5" style={{ backgroundColor: '#CDC4F9' }}>
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard id="chat3" style={{ borderRadius: '15px' }}>
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                                    <div className="p-3">
                                        <MDBInputGroup className="rounded mb-3">
                                            <input
                                                className="form-control rounded"
                                                placeholder="Search"
                                                type="search"
                                            />
                                            <span className="input-group-text border-0" id="search-addon">
                                                <MDBIcon fas icon="search" />
                                            </span>
                                        </MDBInputGroup>

                                        <MDBTypography
                                            listUnStyled
                                            className="mb-0"
                                            style={{ minHeight: '580px', overflowY: 'auto', padding: '10px' }}
                                        >
                                            {chats.map((chat) => (
                                                <li
                                                    key={chat.id}
                                                    className="p-2 border-bottom"
                                                    onClick={() => {
                                                        fetchChatDetails(chat.id);
                                                    }}
                                                    style={{
                                                        cursor: 'pointer',
                                                        backgroundColor: chat.seenBy.includes(currentUser.id)
                                                            ? 'white'
                                                            : '#e2e2e2',
                                                    }}
                                                >
                                                    <a href="#!" className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row">
                                                            <div>
                                                                <img
                                                                    src={
                                                                        chat.receiver.avatar ||
                                                                        'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'
                                                                    }
                                                                    alt="avatar"
                                                                    className="d-flex align-self-center me-3"
                                                                    width="60"
                                                                    height="60"
                                                                    style={{ borderRadius: '50%' }}
                                                                />
                                                                <span className="badge bg-success badge-dot"></span>
                                                            </div>
                                                            <div className="pt-1">
                                                                <p className="fw-bold mb-0">
                                                                    {chat.receiver?.username}
                                                                </p>
                                                                <p className="small text-muted">{chat.lastMessage}</p>
                                                            </div>
                                                        </div>
                                                        <div className="pt-1">
                                                            <p className="small text-muted mb-1">
                                                                {fToNow(chat.createAt)} ago
                                                            </p>
                                                        </div>
                                                    </a>
                                                </li>
                                            ))}
                                        </MDBTypography>
                                    </div>
                                </MDBCol>

                                <MDBCol md="6" lg="7" xl="8">
                                    {selectedChat ? (
                                        <div style={{ minHeight: '580px', overflowY: 'auto', padding: '10px' }}>
                                            {selectedChat.messages.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    className={`d-flex flex-row ${
                                                        msg.userId === currentUser.id
                                                            ? 'justify-content-end'
                                                            : 'justify-content-start'
                                                    }`}
                                                >
                                                    <img
                                                        src={
                                                            msg.userId === currentUser.id
                                                                ? currentUser.avatar ||
                                                                  'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'
                                                                : receiver?.avatar ||
                                                                  'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'
                                                        }
                                                        alt="avatar"
                                                        style={{
                                                            width: '45px',
                                                            height: '45px',
                                                            borderRadius: '50%',
                                                        }}
                                                    />
                                                    <div>
                                                        <p
                                                            className={`small p-2 ms-3 mb-1 rounded-3 ${
                                                                msg.userId === currentUser.id
                                                                    ? 'bg-primary text-white'
                                                                    : 'bg-light'
                                                            }`}
                                                        >
                                                            {msg.text}
                                                        </p>
                                                        <p className="small ms-3 mb-3 text-muted">
                                                            {fToNow(msg.createAt)} ago
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center text-muted">
                                            <p>Select a chat to see messages</p>
                                        </div>
                                    )}

                                    {selectedChat && (
                                        <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                                            <input
                                                style={{ fontSize: '16px' }}
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder="Type message"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />
                                            <a className="ms-1 text-muted" href="#!" onClick={sendMessage}>
                                                <MDBIcon fas icon="paper-plane" />
                                            </a>
                                        </div>
                                    )}
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
