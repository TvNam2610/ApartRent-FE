/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

function UploadWidget({ uwConfig, setState }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById('cloudinary-upload-widget');

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.id = 'cloudinary-upload-widget';
      script.async = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  const openWidget = () => {
    if (!loaded || !window.cloudinary) return;

    const widget = window.cloudinary.createUploadWidget(uwConfig, (error, result) => {
      if (!error && result && result.event === 'success') {
        const imageUrl = result.info.secure_url;
        setState(imageUrl);
      }
    });

    widget.open();
  };

  return (
    <button type="button" className="btn btn-outline-primary" onClick={openWidget}>
      Upload Ảnh
    </button>
  );
}

export default UploadWidget;
