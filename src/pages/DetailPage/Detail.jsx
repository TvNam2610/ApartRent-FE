import { useLoaderData, useNavigate } from 'react-router-dom';
import Slider from '../../components/Slider/Slider';
import Map from '../../components/Map/Map';
import locationIcon from '../../assets/img/pin.png';
import avatar from '../../assets/img/avatar.jpg';
import bed from '../../assets/img/bed.png';
import bath from '../../assets/img/bath.png';
import floor from '../../assets/img/floor.png';
import size from '../../assets/img/size.png';
import { FaPhone, FaRegCommentDots, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import './Detail.scss';
import { formatCurrencyVN } from '../../lib/formatCurrency';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import { toast } from 'react-toastify';

function Detail() {
    const post = useLoaderData();
    const { title, content, realEstate, user, favoriteList, userId } = post;
    console.log(post);

    const [isSaved, setIsSaved] = useState(favoriteList.length > 0);
    const navigate = useNavigate();

    // Hàm lưu/xóa bài viết yêu thích
    const handleSavePost = async () => {
        try {
            const response = await apiRequest('/posts/save-post', {
                method: 'POST',
                data: { postId: post.id },
            });
            setIsSaved(!isSaved);
            toast.success(response.data.message);
        } catch (error) {
            console.error('Error saving post:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };

    // Hàm tạo chat và điều hướng
    const handleSendMessage = async () => {
        try {
            const response = await apiRequest.post('/chat', { receiverId: userId });
            const chatId = response.data.id; // Lấy ID chat mới được tạo

            navigate('/chat', {
                state: {
                    receiverId: user.id, // ID của người nhận
                    chatId, // ID của chat
                },
            });
        } catch (error) {
            console.error('Error creating chat:', error);
            toast.error('Failed to send a message. Please try again later.');
        }
    };

    return (
        <div className="detailPage">
            <div className="details">
                <div className="wrapper">
                    <Slider images={realEstate.images} />
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{title}</h1>
                                <div className="address">
                                    <img src={locationIcon} alt="Location" />
                                    <span>{realEstate.location}</span>
                                </div>
                                <div className="price">{formatCurrencyVN(realEstate.price)} VNĐ</div>
                            </div>
                            <div className="user">
                                <img src={user.avatar || avatar} alt="User avatar" />
                                <span>{user.username}</span>
                            </div>
                        </div>
                        <div className="bottom">
                            <div>{content}</div>
                            <div
                                style={{ color: '#333' }}
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(realEstate.description),
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="features">
                <div className="wrapper">
                    <p className="title">General</p>
                    <div className="general">
                        <div className="key-feature">
                            <img src={bed} alt="Bedroom icon" />
                            <span>Phòng ngủ: {realEstate.bedrooms}</span>
                        </div>
                        <div className="key-feature">
                            <img src={bath} alt="Bathroom icon" />
                            <span>Phòng tắm: {realEstate.bathrooms}</span>
                        </div>
                        <div className="key-feature">
                            <img src={size} alt="Size icon" />
                            <span>
                                Diện tích: {realEstate.area}m<sup>2</sup>
                            </span>
                        </div>
                        <div className="key-feature">
                            <img src={floor} alt="Floor icon" />
                            <span>Tầng: {realEstate.floor}</span>
                        </div>
                    </div>
                    <p className="title">Features</p>
                    <div className="list-feature">
                        {realEstate.features.map((feature, index) => (
                            <div className="feature" key={index}>
                                {feature},
                            </div>
                        ))}
                    </div>
                    <p className="title">Location</p>
                    <div className="mapContainer">
                        <Map properties={[realEstate]} />
                    </div>
                    <div className="buttons">
                        <button className="numberPhone">
                            <FaPhone />
                            0971926588
                        </button>
                    </div>
                    <div className="buttons">
                        <button onClick={handleSendMessage}>
                            <FaRegCommentDots />
                            Send a message
                        </button>
                        <button onClick={handleSavePost}>
                            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                            {isSaved ? 'Unsave the place' : 'Save the place'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
