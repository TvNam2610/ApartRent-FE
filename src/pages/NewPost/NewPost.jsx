import { useState, useEffect } from 'react';
import Step1GeneralInfo from './Step1GeneralInfo';
import Step2DetailInfo from './Step2DetailInfo';
import Step3LocationUpload from './Step3LocationUpload';
import Step4ContactInfo from './Step4ContactInfo';
import Step5PackageSelection from './Step5PackageSelection';
import Step6ConfirmPost from './Step6ConfirmPost';
import './NewPost.scss';
import { useNavigate } from 'react-router-dom';

function NewPostPage() {
    const [step, setStep] = useState(() => {
        return parseInt(localStorage.getItem('newPostStep')) || 1;
    });

    // Mỗi khi step thay đổi -> lưu vào localStorage
    useEffect(() => {
        localStorage.setItem('newPostStep', step.toString());
    }, [step]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        type: '',
        price: '',
        location: '',
        content: '',
        description: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        floor: '',
        features: '',
        images: [],
        contactName: '',
        phone: '',
        email: '',
        packageId: '',
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const stepTitles = {
        1: 'Thông tin Căn hộ',
        2: 'Thông tin chi tiết',
        3: 'Hình ảnh & Vị trí',
        4: 'Thông tin liên hệ',
        5: 'Lựa chọn gói tin',
        6: 'Xác nhân thanh toán',
    };

    return (
        <div className="new-post-wrapper">
            {/* Header */}
            <div className="post-header">
                <div className="title-box">
                    <h5 className="main-title">Tạo tin đăng</h5>
                </div>
                <div className="step-navigation d-flex justify-content-between px-4 pt-4">
                    {[1, 2, 3, 4, 5, 6].map((s) => (
                        <div key={s} className={`step-item ${step === s ? 'active' : step > s ? 'done' : ''}`}>
                            <div className="step-circle">{s}</div>
                            <div className="step-label">{stepTitles[s]}</div>
                        </div>
                    ))}
                </div>
                <button
                    className="exit-btn"
                    onClick={() => {
                        navigate('/'); // Chuyển hướng về trang chủ hoặc trang quản lý tin
                        localStorage.removeItem('newPostStep'); // Xóa bước hiện tại trong localStorage
                    }}
                >
                    THOÁT
                </button>
            </div>

            {/* Main Form */}
            <div className="post-body">
                {step === 1 && <Step1GeneralInfo formData={formData} setFormData={setFormData} onNext={nextStep} />}
                {step === 2 && (
                    <Step2DetailInfo
                        formData={formData}
                        setFormData={setFormData}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                )}
                {step === 3 && (
                    <Step3LocationUpload
                        formData={formData}
                        setFormData={setFormData}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                )}
                {step === 4 && (
                    <Step4ContactInfo
                        formData={formData}
                        setFormData={setFormData}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                )}
                {step === 5 && (
                    <Step5PackageSelection
                        formData={formData}
                        setFormData={setFormData}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                )}

                {step === 6 && (
                    <Step6ConfirmPost
                        formData={formData}
                        setFormData={setFormData}
                        onPrev={prevStep}
                        onNext={() => {
                            // Xóa bước hiện tại trong localStorage
                            localStorage.removeItem('newPostStep');
                            navigate('/');
                        }} // Sau khi thanh toán có thể chuyển về trang chủ hoặc trang quản lý tin
                    />
                )}
            </div>
        </div>
    );
}

export default NewPostPage;
