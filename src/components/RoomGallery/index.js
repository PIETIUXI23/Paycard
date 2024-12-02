import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './style.scss';

function RoomGallery({ data }) {
    return (
        <ImageGallery
            items={data.map((img, index) => {
                return {
                    original: img.image_path,
                    thumbnail: img.image_path,
                };
            })}
            showPlayButton={false}
            showFullscreenButton={false}
        />
    );
}

export default RoomGallery;
