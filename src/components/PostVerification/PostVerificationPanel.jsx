/* eslint-disable no-unused-vars */
// 📁 src/components/Post/PostVerificationPanel.jsx
import { useEffect, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import './PostVerificationPanel.scss';

// eslint-disable-next-line react/prop-types
const PostVerificationPanel = ({ postId }) => {
    console.log(postId)
    const [reportCount, setReportCount] = useState(0);
    const [showLabel, setShowLabel] = useState(false);

    useEffect(() => {
        const fetchReportCount = async () => {
            try {
                const res = await apiRequest.get(`/posts/${postId}/report-count`);
                if (res.data?.reportCount !== undefined) {
                    setReportCount(res.data.reportCount);
                }
            } catch (err) {
                console.error('Lỗi lấy report count:', err);
            }
        };

        fetchReportCount();
    }, [postId]);

    const handleReport = async () => {
        const { value: reason } = await Swal.fire({
            title: 'Báo cáo tin lừa đảo',
            input: 'textarea',
            inputLabel: 'Vui lòng nhập lý do báo cáo',
            inputPlaceholder: 'Nhập nội dung tại đây...',
            showCancelButton: true,
            confirmButtonText: 'Gửi báo cáo',
            cancelButtonText: 'Hủy',
          });
      
        if (!reason) return;
        try {
            await apiRequest.post(`/posts/${postId}/report`, { reason });
            toast.success('Đã gửi báo cáo. Cảm ơn bạn!');
            setReportCount((prev) => prev + 1);
        } catch (err) {
            toast.error('Gửi báo cáo thất bại.');
        }
    };

    return (
        <>
            {/* Popup floating report button */}
            <div
                className="report-float-button"
                onClick={handleReport}
                onMouseEnter={() => setShowLabel(true)}
                onMouseLeave={() => setShowLabel(false)}
            >
                ❗{showLabel && <div className="tooltip-report">Báo cáo tin lừa đảo</div>}
            </div>
        </>
    );
};

export default PostVerificationPanel;
