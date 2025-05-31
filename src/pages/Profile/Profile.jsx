import './Profile.scss';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import Wallet from '../../components/Wallet/Wallet';

function Profile() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    console.log(currentUser)

    return (
        currentUser && (
            <>
                <div className="profile">
                    <div className="details">
                        <div className="wrapper">
                            <div className="title">
                                <h1>User Information</h1>
                                <Link to="/profile/update">
                                    <button className="update-button">Update Profile</button>
                                </Link>
                            </div>
                            <div className="info">
                                <div className="info-item">
                                    <span>Avatar:</span>
                                    <img src={currentUser.avatar} alt="Avatar" />
                                </div>
                                <div className="info-item">
                                    <span>Username:</span>
                                    <b>{currentUser.username}</b>
                                </div>
                                <div className="info-item">
                                    <span>Email:</span>
                                    <b>{currentUser.email}</b>
                                </div>
                                <div className="info-item">
                                    <span>Số điện thoại:</span>
                                    <b>{currentUser.phone || '0971926588'}</b>
                                </div>
                                <div className="info-item">
                                    <span>Địa chỉ:</span>
                                    <b>
                                        {currentUser.address?.city || 'Chưa có dữ liệu'},{' '}
                                        {currentUser.address?.district || 'Chưa có dữ liệu'},{' '}
                                        {currentUser.address?.ward || 'Chưa có dữ liệu'}
                                    </b>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Wallet />
                </div>
            </>
        )
    );
}

export default Profile;
