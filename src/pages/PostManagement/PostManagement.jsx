import { useEffect, useState } from 'react';
import PostFilterBar from '../../components/Post/PostFilterBar.jsx';
import PostTable from '../../components/Post/PostTable.jsx';
import apiRequest from '../../lib/apiRequest';
import { Pagination } from 'react-bootstrap';
import Header from '../../components/Header/header.jsx';
import EditPostModal from '../../components/Post/EditPostModal.jsx'
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
            console.log(res.data.posts);
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
    console.log('post: ', posts);

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
