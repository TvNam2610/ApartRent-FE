import { useContext, useState } from 'react';
import './Login.scss';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [isActive, setIsActive] = useState(false);
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { updateUser } = useContext(AuthContext);
    
    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        const user = {
            name: registerName,
            email: registerEmail,
            password: registerPassword,
        };

        const fetchApi = async () => {
            try {
                // Thực hiện đăng ký
                // eslint-disable-next-line no-unused-vars
                const result = await apiRequest.post('/auth/register', {
                    username: user.name,
                    email: user.email,
                    password: user.password,
                });
                // Hiển thị thông báo thành công khi đăng ký
                toast.success('Register Success!');
            } catch (error) {
                // Hiển thị thông báo lỗi khi đăng ký thất bại
                setError(error.response.data.message);
                toast.error(error.response.data.message);
            }
        };
        fetchApi();
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email: loginEmail,
            password: loginPassword,
        };

        const fetchApi = async () => {
            try {
                // Thực hiện đăng nhập
                const res = await apiRequest.post('/auth/login', user);
                updateUser(res.data);
                // Hiển thị thông báo thành công khi đăng nhập
                toast.success('Login Success!');
                navigate('/');
            } catch (error) {
                // Hiển thị thông báo lỗi khi đăng nhập thất bại
                setError(error.response.data.message);
                toast.error(error.response.data.message);
            }
        };
        fetchApi();
    };

    return (
        <div className="container" id="container">
            <div className={`login ${isActive ? 'active' : ''}`}>
                <div className="form-containerr sign-up">
                    <form onSubmit={handleRegisterSubmit}>
                        <h1>Create Account</h1>
                        <span>or use your email for registration</span>
                        <input
                            type="text"
                            placeholder="Name"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                        {error && <span style={{ color: 'red' }}>{error}</span>}
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="form-containerr sign-in">
                    <form onSubmit={handleLoginSubmit}>
                        <h1>Sign In</h1>
                        <span>or use your email password</span>
                        <input
                            type="email"
                            required
                            placeholder="Email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <a href="#">Forget Your Password?</a>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button
                                className={`hidden ${isActive ? '' : 'active'}`}
                                id="login"
                                onClick={handleLoginClick}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button
                                className={`hidden ${isActive ? '' : 'active'}`}
                                id="register"
                                onClick={handleRegisterClick}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Toastify Toast Container */}
            <ToastContainer />
        </div>
    );
}

export default Login;
