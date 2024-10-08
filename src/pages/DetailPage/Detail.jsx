import Header from '../../components/Header/header';
import Footer from '../../components/Footer/Footer';
import Slider from '../../components/Slider/Slider';
import Map from '../../components/Map/Map';

import location from '../../assets/img/pin.png';
import avatar from '../../assets/img/avatar.jpg';
import chat from '../../assets/img/chat.png';
import save from '../../assets/img/save.png';
import bed from '../../assets/img/bed.png';
import bath from '../../assets/img/bath.png';
import floor from '../../assets/img/floor.png';
import size from '../../assets/img/size.png';

import './Detail.scss';

const images = [
    'https://pix.dotproperty.co.th/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxOTFkNjUzLTZjMzQtN2NjYS05NzMxLTcyZDdlNTA0MDZlZC8wMTkxZDY1My04ZWJhLTcyY2UtOGFkNy05NjY0OTMzNWJmMWMuanBnIiwiYnJhbmQiOiJET1RQUk9QRVJUWSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDkwLCJoZWlnaHQiOjMyNSwiZml0IjoiY292ZXIifX19',
    'https://pix.dotproperty.co.th/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxOTE3ZTMwLThlMGQtNzIyNi1hMWQ2LTUwZTgyZTVjYjViYi8wMTkxN2UzMC04Zjc1LTcxMjUtODVhMC01YTIzNjVkZWU4NDQuanBnIiwiYnJhbmQiOiJET1RQUk9QRVJUWSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDkwLCJoZWlnaHQiOjMyNSwiZml0IjoiY292ZXIifX19',
    'https://pix.dotproperty.co.th/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJwcm9wZXJ0aWVzLzAxOTE3ZDgxLTQzZTMtNzk5My04MzIzLTg5MmI0Y2YyNjhmYi8wMTkxN2VhMi1kOGY3LTcwNTQtOTEzOS0wZjAxYzNjNmZhMWQuanBnIiwiYnJhbmQiOiJET1RQUk9QRVJUWSIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDkwLCJoZWlnaHQiOjMyNSwiZml0IjoiY292ZXIifX19',
];

function Detail() {
    return (
        <>
            <Header />

            <div className="detailPage">
                <div className="details">
                    <div className="wrapper">
                        <Slider images={images} />
                        <div className="info">
                            <div className="top">
                                <div className="post">
                                    <h1>tên dự án</h1>
                                    <div className="address">
                                        <img src={location} alt="" />
                                        <span>address</span>
                                    </div>
                                    <div className="price">1.000.000.000 VNĐ</div>
                                </div>
                                <div className="user">
                                    <img src={avatar} alt="" />
                                    <span>user name</span>
                                </div>
                            </div>
                            <div className="bottom">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis at laudantium in qui,
                                voluptatibus est nihil autem. Tenetur in iste nesciunt, magnam aut iusto blanditiis nemo
                                tempora minus nam eligendi.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="features">
                    <div className="wrapper">
                        <p className="title">General</p>
                        <div className="general">
                            <div className="key-feature">
                                <img src={bed} alt="" />
                                <span>Phòng ngủ: 2</span>
                            </div>
                            <div className="key-feature">
                                <img src={bath} alt="" />
                                <span>Phòng tắm: 2</span>
                            </div>
                            <div className="key-feature">
                                <img src={size} alt="" />
                                <span>
                                    Diện tích: 2m<sup>2</sup>
                                </span>
                            </div>
                            <div className="key-feature">
                                <img src={floor} alt="" />
                                <span>Tầng: 22</span>
                            </div>
                        </div>

                        <p className="title">Features</p>
                        <div className="list-feature">
                            <div className="feature">parking area</div>
                            <div className="feature">parking area</div>
                            <div className="feature">parking area</div>
                            <div className="feature">parking area</div>
                            <div className="feature">parking area</div>
                            <div className="feature">parking area</div>
                            <div className="feature">parking area</div>
                        </div>

                        <p className="title">location</p>
                        <div className="mapContainer">
                            <Map properties={images} />
                        </div>

                        <div className="buttons">
                            <button>
                                <img src={chat} alt="" />
                                Send a message
                            </button>
                            <button>
                                <img src={save} alt="" />
                                Save the palace
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Detail;
