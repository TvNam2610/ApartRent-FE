import { useLoaderData } from 'react-router-dom';
import Slider from '../../components/Slider/Slider';
import Map from '../../components/Map/Map';

import locationIcon from '../../assets/img/pin.png';
import avatar from '../../assets/img/avatar.jpg';
import chat from '../../assets/img/chat.png';
import save from '../../assets/img/save.png';
import bed from '../../assets/img/bed.png';
import bath from '../../assets/img/bath.png';
import floor from '../../assets/img/floor.png';
import size from '../../assets/img/size.png';

import './Detail.scss';
import { formatCurrencyVN } from '../../lib/formatCurrency';
import DOMPurify from 'dompurify';

function Detail() {
    const post = useLoaderData();
    console.log(post);

    const { title, content, realEstate, user } = post;

    return (
        <>
            <div className="detailPage">
                <div className="details">
                    <div className="wrapper">
                        <Slider images={realEstate.images} /> {/* Hiển thị hình ảnh từ realEstate */}
                        <div className="info">
                            <div className="top">
                                <div className="post">
                                    <h1>{title}</h1> {/* Hiển thị tên dự án */}
                                    <div className="address">
                                        <img src={locationIcon} alt="Location" />
                                        <span>{realEstate.location}</span> {/* Hiển thị địa chỉ */}
                                    </div>
                                    <div className="price">{formatCurrencyVN(realEstate.price)} VNĐ</div>{' '}
                                    {/* Hiển thị giá */}
                                </div>
                                <div className="user">
                                    <img src={user.avatar || avatar} alt="User avatar" />
                                    <span>{user.username}</span> {/* Hiển thị tên người đăng */}
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
                                    {feature}
                                </div>
                            ))}
                        </div>
                        {console.log(realEstate.features)}
                        <p className="title">Location</p>
                        <div className="mapContainer">
                            <Map properties={[realEstate]} /> {/* Truyền dữ liệu cho bản đồ */}
                        </div>
                        <div className="buttons">
                            <button>
                                <img src={chat} alt="Chat" />
                                Send a message
                            </button>
                            <button>
                                <img src={save} alt="Save" />
                                Save the place
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detail;
