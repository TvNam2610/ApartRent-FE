import {  useParams } from 'react-router-dom'; //, useNavigate
import Slider from '../../components/Slider/Slider';
// import Map from '../../components/Map/Map';
import locationIcon from '../../assets/img/pin.png';
import avatar from '../../assets/img/avatar.jpg';
import bed from '../../assets/img/bed.png';
import bath from '../../assets/img/bath.png';
import floor from '../../assets/img/floor.png';
import size from '../../assets/img/size.png';
import { FaPhone } from 'react-icons/fa'; //, FaBookmark, FaRegBookmark, FaRegCommentDots
import './Detail.scss';
import { formatCurrencyVN } from '../../lib/formatCurrency';
import DOMPurify from 'dompurify';
import { useState, useEffect } from 'react';
import apiRequest from '../../lib/apiRequest';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

import { Modal } from 'react-bootstrap';
import SeoHelmet from '../../components/SeoHelmet/seoHelmet.jsx';
import PostVerificationPanel from '../../components/PostVerification/PostVerificationPanel.jsx';


// import { toast } from 'react-toastify';

function Detail() {
    const { slugAndId } = useParams();
    const [post, setPost] = useState(null)
    const [images, setImages] = useState([]);
    const [showRegisterForm, setShowRegisterForm] = useState(false);


    let id = null;
    



     // Fetch bài đăng và ảnh
    useEffect(() => {
        const match = slugAndId.match(/-id(\d+)$/);
         id = match ? match[1] : null;
        const fetchData = async () => {
            try {
                const postRes = await apiRequest(`/posts/${id}`);
                setPost(postRes.data);

                const imageRes = await apiRequest(`/posts/images/${id}`);
                const imageUrls = imageRes.data.map((img) => img.imageUrl);
                setImages(imageUrls);
            } catch (error) {
                console.error('Error loading post or images:', error);
            }
        };
        fetchData();
    }, [id]);

    console.log('Postdata:', post);
    console.log('Images:', images);

    // const [isSaved, setIsSaved] = useState(favoriteList.length > 0);
    // const navigate = useNavigate();

    // Hàm lưu/xóa bài viết yêu thích
    // const handleSavePost = async () => {
    //     try {
    //         const response = await apiRequest('/posts/save-post', {
    //             method: 'POST',
    //             data: { postId: post.id },
    //         });
    //         setIsSaved(!isSaved);
    //         toast.success(response.data.message);
    //     } catch (error) {
    //         console.error('Error saving post:', error);
    //         alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    //     }
    // };

    

    return (
        !post ? (
            <div>⏳ Đang tải...</div>
        ) : (
        <div className="detailPage">
            <SeoHelmet
                title={`${post.title} - Apartrent`}
                description={post.description?.slice(0, 150) || 'Xem thông tin chi tiết căn hộ.'}
                image={post.thumbnail}
            />
            <PostVerificationPanel postId={id} />
            <div className="details">
                <div className="wrapper">
                    <Slider images={images} />
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{post.title}</h1>
                                {post.verified === 1 && <div className="badge bg-success mb-2">Tin đã xác minh</div>}
                                <div className="address">
                                    <img src={locationIcon} alt="Location" />
                                    <span>{post.location}</span>
                                </div>
                                <div className="price">{formatCurrencyVN(post.price)} VNĐ</div>
                            </div>
                            <div className="user">
                                <img src={post.avatar || avatar} alt="User avatar" />
                                <span>{post.username}</span>
                            </div>
                        </div>
                        <div className="bottom">
                            <div>{post.content}</div>
                            <div
                                style={{ color: '#333' }}
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(post.description),
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
                            <span>Phòng ngủ: {post.bedrooms}</span>
                        </div>
                        <div className="key-feature">
                            <img src={bath} alt="Bathroom icon" />
                            <span>Phòng tắm: {post.bathrooms}</span>
                        </div>
                        <div className="key-feature">
                            <img src={size} alt="Size icon" />
                            <span>
                                Diện tích: {post.area}m<sup>2</sup>
                            </span>
                        </div>
                        <div className="key-feature">
                            <img src={floor} alt="Floor icon" />
                            <span>Tầng: {post.floor}</span>
                        </div>
                    </div>
                    <p className="title">Features</p>
                    <div className="list-feature">{post.features}</div>
                    <p className="title">Location</p>
                    <div className="location-box border rounded p-3 bg-light mb-4">
                        {/* Dòng địa chỉ + icon */}
                        <div className="d-flex align-items-center mb-3">
                            <img src={locationIcon} alt="Location Icon" width={24} className="me-2" />
                            <strong>Địa chỉ:</strong>
                            <span className="ms-2">{post.location ? post.location : 'Không có địa chỉ cụ thể'}</span>
                        </div>

                        {/* Google Maps */}
                        {post.location ? (
                            <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm">
                                <iframe
                                    title="Google Map"
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                                        post.location,
                                    )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                    allowFullScreen
                                    loading="lazy"
                                    className="rounded"
                                ></iframe>
                            </div>
                        ) : (
                            <div className="alert alert-warning mb-0">Không thể hiển thị bản đồ do thiếu địa chỉ.</div>
                        )}
                    </div>
                    <div className="d-flex gap-2 flex-column">
                        <button className="btn btn-lg btn-primary">
                            <FaPhone className="me-2" />
                            {post.phone}
                        </button>

                        <button className="btn btn-primary btn-lg" onClick={() => setShowRegisterForm(true)}>
                            📝 Đăng ký tham quan
                        </button>
                    </div>
                </div>
            </div>
            <Modal show={showRegisterForm} onHide={() => setShowRegisterForm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>📝 Đăng ký tham quan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegisterForm
                        onClose={() => setShowRegisterForm(false)}
                        postTitle={post.title}
                        postId={post.id}
                        postUsername={post.username}
                        ownerEmail={post.email} // 👈 rất quan trọng: email người bán
                    />
                </Modal.Body>
            </Modal>
        </div>)
        
    );
}

export default Detail;
