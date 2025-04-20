import './ProfileUpdate.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import UploadWidget from '../../components/uploadWidget/uploadWidget';
import Noavatar from '../../assets/img/noavatar.jpg';
import AddressSelector from '../../components/AddLocation/AddLocation';

function ProfileUpdatePage() {
    const { currentUser, updateUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [avatar, setAvatar] = useState([]);
    const [address, setAddress] = useState({
        city: currentUser?.address?.city || '',
        district: currentUser?.address?.district || '',
        ward: currentUser?.address?.ward || '',
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const { username, email, password, phone } = Object.fromEntries(formData);

        try {
            console.log('Sending data to API:', {
                username,
                email,
                password,
                phone,
                avatar: avatar[0],
                address,
            });

            const res = await apiRequest.put(`/users/${currentUser.id}`, {
                username,
                email,
                password,
                phone,
                avatar: avatar[0],
                address,
            });
            updateUser(res.data);
            navigate('/profile');
        } catch (err) {
            console.error('Error updating user:', err);
            setError(err.response?.data?.message || 'Failed to update user!');
        }
    };

    const handleAddressChange = (selectedAddress) => {
        setAddress({
            city: selectedAddress.city || '',
            district: selectedAddress.district || '',
            ward: selectedAddress.ward || '',
        });
    };

    return (
        <div className="profileUpdatePage">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Update Profile</h1>
                    <div className="form">
                        <div className="left">
                            <div className="item">
                                <label htmlFor="username">Username</label>
                                <input id="username" name="username" type="text" defaultValue={currentUser.username} />
                            </div>
                            <div className="item">
                                <label htmlFor="email">Email</label>
                                <input id="email" name="email" type="email" defaultValue={currentUser.email} />
                            </div>
                            <div className="item">
                                <label htmlFor="password">Password</label>
                                <input id="password" name="password" type="password" />
                            </div>
                            <div className="item">
                                <label htmlFor="phone">Phone Number</label>
                                <input id="phone" name="phone" type="text" defaultValue={currentUser.phone} />
                            </div>
                        </div>
                        <div className="right">
                            <div className="item">
                                <label>Địa chỉ</label>
                                <AddressSelector
                                    onAddressChange={(selected) =>
                                        handleAddressChange({
                                            city: selected.city, // Sửa lại để trùng với AddressSelector
                                            district: selected.district,
                                            ward: selected.ward,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <button>Cập nhật</button>
                    {error && <span>{error}</span>}
                </form>
            </div>
            <div className="sideContainer">
                <img src={avatar[0] || currentUser.avatar || Noavatar} alt="" className="avatar" />
                <UploadWidget
                    uwConfig={{
                        cloudName: 'dnreglgpk',
                        uploadPreset: 'apartrent',
                        multiple: false,
                        maxImageFileSize: 2000000,
                        folder: 'avatars',
                    }}
                    setState={setAvatar}
                />
            </div>
        </div>
    );
}

export default ProfileUpdatePage;
