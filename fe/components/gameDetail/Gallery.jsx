import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

const Gallery = ({ data }) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (!data) return;
    setImages([]);
    let newData = [];
    data.map((each) => {
      newData.push({
        original: `https://images.igdb.com/igdb/image/upload/t_1080p/${each.image_id}.jpg`,
        thumbnail: `https://images.igdb.com/igdb/image/upload/t_cover_small/${each.image_id}.jpg`,
      });
    });
    setImages(newData);
  }, [data]);
  return (
    <>
      {images && images.length > 0 && (
        <div
          className='container'
          style={{ maxWidth: '95%', margin: 'auto', marginBottom: '3rem' }}
        >
          <ImageGallery items={images} lazyLoad infinite />
        </div>
      )}
    </>
  );
};

export default Gallery;
