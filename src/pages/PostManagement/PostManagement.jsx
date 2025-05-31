import { useEffect, useState } from 'react';
import PostFilterBar from '../../components/Post/PostFilterBar.jsx';
import PostTable from '../../components/Post/PostTable.jsx';
import apiRequest from '../../lib/apiRequest';
import { Pagination } from 'react-bootstrap';
import Header from '../../components/Header/header.jsx';
import EditPostModal from '../../components/Post/EditPostModal.jsx';
import { toast } from 'react-toastify';

function PostManagementPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [filters, setFilters] = useState({
        keyword: '',
        status: '',
        packageType: '',
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [total, setTotal] = useState(0);

    // eslint-disable-next-line no-unused-vars
    const [editingPost, setEditingPost] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await apiRequest.get(`/posts/user/${user.id}`, {
                params: {
                    ...filters,
                    page,
                    limit,
                },
            });
            setPosts(res.data.posts);
            setTotal(res.data.total);
        } catch (err) {
            console.error('Lỗi khi tải bài đăng:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(fetchPosts, 300); // debounce để tránh gọi API quá nhanh khi nhập liệu
        return () => clearTimeout(debounce);
    }, [filters, page]);

    const totalPages = Math.ceil(total / limit);

    const handleDeletePost = async (post) => {
        showConfirmToast(post, async (postToDelete) => {
            try {
                await apiRequest.delete(`/posts/${postToDelete.id}`);
                toast.success('🗑️ Đã xoá bài đăng!');
                fetchPosts(); // load lại danh sách
            } catch (err) {
                console.error(err);
                toast.error('❌ Xóa thất bại!');
            }
        });
    };

    const handleHidePost = async (post) => {
        if (!post?.id) {
            console.warn('Không tìm thấy ID bài đăng.');
            return;
        }

        try {
            const payload = {
                postId: post.id,
                status: 'HIDDEN',
                email: user.email,
                title: post.title,
                username: user.username, // Thêm username nếu cần thiết
            };

            const response = await apiRequest.post(`/posts/update-status`, payload);

            if (response.status === 200) {
                toast.success(`👁️ Bài đăng "${post.title}" đã được ẩn.`);
                fetchPosts(); // Tải lại danh sách bài đăng
            } else {
                toast.error('❌ Không thể ẩn bài đăng!');
            }
        } catch (err) {
            console.error('Lỗi khi ẩn bài đăng:', err);
            toast.error('❌ Không thể ẩn bài đăng!');
        }
    };

    const showConfirmToast = (post, onConfirm) => {
        toast.info(
            ({ closeToast }) => (
                <div>
                    <div>
                        Bạn có chắc muốn xoá bài <strong>{post.title}</strong>?
                    </div>
                    <div className="mt-2 d-flex justify-content-end gap-2">
                        <button className="btn btn-sm btn-secondary" onClick={closeToast}>
                            ❌ Hủy
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={async () => {
                                await onConfirm(post);
                                closeToast();
                            }}
                        >
                            🗑️ Xoá
                        </button>
                    </div>
                </div>
            ),
            {
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
                position: 'top-center',
            },
        );
    };

    return (
        <>
            <Header />
            <div className="post-management-page container-lg py-4">
                <h4 className="mb-4">📋 Quản lý bài đăng của tôi</h4>
                <PostFilterBar filters={filters} onFiltersChange={setFilters} />
                <PostTable
                    posts={posts}
                    loading={loading}
                    onEdit={(post) => {
                        setEditingPost(post);
                        setShowEditModal(true);
                    }}
                    onDelete={handleDeletePost}
                    onHide={handleHidePost}
                />

                {/* Pagination */}
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        {[...Array(totalPages)].map((_, i) => (
                            <Pagination.Item key={i + 1} active={i + 1 === page} onClick={() => setPage(i + 1)}>
                                {i + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>

            <EditPostModal
                show={showEditModal}
                post={editingPost}
                onHide={() => setShowEditModal(false)}
                onSave={async (updatedPost) => {
                    try {
                        await apiRequest.put(`/posts/${updatedPost.id}`, updatedPost);
                        toast.success('Cập nhật thành công!');
                        setShowEditModal(false);
                        fetchPosts();
                    } catch (err) {
                        console.error(err);
                        toast.error('Cập nhật thất bại!');
                    }
                }}
            />
        </>
    );
}

export default PostManagementPage;
