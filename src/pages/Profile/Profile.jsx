// import Footer from '../../components/Footer/Footer';
import List from '../../components/List/List';
import './Profile.scss';
import Chat from '../../components/Chat/Chat';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);
    return (
        currentUser && (
            <>
                <div className="profile">
                    <div className="details">
                        <div className="wrapper">
                            <div className="title">
                                <h1>User Information</h1>
                                <Link to="/profile/update">
                                    <button>Update Profile</button>
                                </Link>
                            </div>
                            <div className="info">
                                <span>
                                    Avatar:
                                    <img src={currentUser.avatar} alt="" />
                                </span>
                                <span>
                                    Username: <b>{currentUser.username}</b>
                                </span>
                                <span>
                                    Email: <b>{currentUser.email}</b>
                                </span>
                            </div>

                            <div className="title">
                                <h1>My List</h1>
                                <Link to="/profile/add">
                                    <button>Create New Post</button>
                                </Link>
                            </div>

                            <List />
                            <div className="title">
                                <h1>Save List</h1>
                            </div>
                            <List />
                        </div>
                    </div>
                    <div className="chatContainer">
                        <div className="wrapper">
                            <Chat />
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </>
        )
    );
}

export default Profile;
