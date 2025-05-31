import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import UploadWidget from '../../components/uploadWidget/uploadWidget';
import Noavatar from '../../assets/img/noavatar.jpg';
import AddressSelector from '../../components/AddLocation/AddLocation';
import './ProfileUpdate.scss';

function ProfileUpdatePage() {
    const { currentUser, updateUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [avatar, setAvatar] = useState(currentUser.avatar || Noavatar);
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
            const res = await apiRequest.put(`/users/${currentUser.id}`, {
                username,
                email,
                phone,
                password,
                avatar, 
                city: address.city,
                district: address.district,
                ward: address.ward,
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
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg">
                        <div className="card-header bg-primary text-white text-center">
                            <h3>Update Profile</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            defaultValue={currentUser.username}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            defaultValue={currentUser.email}
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Leave blank to keep current"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="phone" className="form-label">Phone Number</label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="text"
                                            defaultValue={currentUser.phone}
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Address</label>
                                        <AddressSelector selectedAddress={address} onAddressChange={handleAddressChange} />
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <label className="form-label">Avatar</label>
                                        <div className="d-flex flex-column align-items-center">
                                            <img
                                                src={avatar}
                                                alt="Avatar"
                                                className="rounded-circle mb-2"
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            />

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
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary px-4">
                                        Update
                                    </button>
                                </div>

                                {error && (
                                    <div className="alert alert-danger mt-3">
                                        {error}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileUpdatePage;
