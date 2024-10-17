import { useState } from 'react';
import { toast } from 'react-toastify';
import './NewPost.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiRequest from '../../lib/apiRequest';
import UploadWidget from '../../components/uploadWidget/uploadWidget.jsx';
// import { useNavigate } from 'react-router-dom';

function NewPostPage() {
    const [value, setValue] = useState('');
    const [images, setImages] = useState([]);
    const [type, setType] = useState('rent');

    // const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);

        try {
            // eslint-disable-next-line no-unused-vars
            const res = await apiRequest.post('/posts', {
                postData: {
                    title: inputs.title,
                    content: inputs.content,
                    status: 'PENDING',
                },
                realEstate: {
                    description: value,
                    price: parseFloat(inputs.price),
                    location: inputs.address,
                    status: type === 'rent' ? 'FOR_RENT' : 'FOR_SALE',
                    bedrooms: parseInt(inputs.bedroom),
                    bathrooms: parseInt(inputs.bathroom),
                    area: parseFloat(inputs.size),
                    floor: parseInt(inputs.floor),
                    features: [inputs.features],
                    images: images,
                },
            });
            console.log('API request success:', res);
            // toast.success('Bài đăng đã được thêm thành công và đang chờ duyệt!');

            // navigate('/ ' + res.data.id);
            if (res.status === 200) {
                toast.success('Bài đăng đã được thêm thành công và đang chờ duyệt!');
            } else {
                toast.error('Có lỗi xảy ra khi thêm bài đăng!');
            }
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="newPostPage">
            <div className="formContainer">
                <h1>Add New Post</h1>
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="item">
                            <label htmlFor="type">Type</label>
                            <select name="type" onChange={(e) => setType(e.target.value)}>
                                {' '}
                                {/* Thêm onchange để cập nhật state */}
                                <option value="rent" defaultChecked>
                                    Rent
                                </option>
                                <option value="buy">Buy</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" type="text" />
                        </div>
                        <div className="item">
                            <label htmlFor="content">Content</label>
                            <input id="content" name="content" type="text" />
                        </div>
                        <div className="item">
                            <label htmlFor="price">Price</label>
                            <input id="price" name="price" type="number" step="0.01" />
                            {type === 'rent' && <span>Price per month</span>} {/* Hiển thị thông tin nếu là rent */}
                        </div>
                        <div className="item">
                            <label htmlFor="address">Location</label>
                            <input id="address" name="address" type="text" />
                        </div>
                        <div className="item description">
                            <label htmlFor="desc">Description</label>
                            <ReactQuill theme="snow" onChange={setValue} value={value} />
                        </div>
                        <div className="item">
                            <label htmlFor="bedroom">Bedroom Number</label>
                            <input min={1} id="bedroom" name="bedroom" type="number" />
                        </div>
                        <div className="item">
                            <label htmlFor="bathroom">Bathroom Number</label>
                            <input min={1} id="bathroom" name="bathroom" type="number" />
                        </div>
                        <div className="item">
                            <label htmlFor="floor">Floor</label>
                            <input id="floor" name="floor" type="number" min={1} />
                        </div>
                        <div className="item">
                            <label htmlFor="size">Total Size (m2)</label>
                            <input min={0} id="size" name="size" type="number" step="0.1" />
                        </div>
                        <div className="item">
                            <label htmlFor="features">Features</label>
                            <input
                                id="features"
                                name="features"
                                type="text"
                                placeholder="e.g., Air conditioning, Parking"
                            />
                        </div>

                        <button className="sendButton">Add</button>
                    </form>
                </div>
            </div>
            <div className="sideContainer">
                {images.map((image, index) => (
                    <img src={image} key={index} alt="" />
                ))}
                <UploadWidget
                    uwConfig={{
                        multiple: true,
                        cloudName: 'dnreglgpk',
                        uploadPreset: 'apartrent',
                        folder: 'posts',
                    }}
                    setState={setImages}
                />
            </div>
        </div>
    );
}

export default NewPostPage;
