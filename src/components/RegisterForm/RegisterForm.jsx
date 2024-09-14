import { useState } from 'react';
import './RegisterForm.scss';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        project: '',
        name: '',
        email: '',
        phone: '',
        time: '',
        date: '',
        visitType: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        alert('Đăng ký thành công!');
    };

    return (
        <div className="form-container">
            <h2>Đăng ký tham quan</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="project">Chọn dự án</label>
                <select id="project" name="project" value={formData.project} onChange={handleInputChange} required>
                    <option value="">Chọn dự án</option>
                    <option value="vinhomes-ocean-park">Vinhomes Ocean Park</option>
                    <option value="vinhomes-smart-city">Vinhomes Smart City</option>
                </select>

                <label htmlFor="name">Họ và tên</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="phone">Số điện thoại</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="time">Lựa chọn thời gian tham quan</label>
                <input type="time" id="time" name="time" value={formData.time} onChange={handleInputChange} required />
                <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required />
                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
};

export default RegisterForm;
