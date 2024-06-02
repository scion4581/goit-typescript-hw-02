import { FC } from 'react';

import { Image } from '../../types';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

interface ImageGalleryProps {
    images: Image[],
    onImageClick: (image: Image) => void
}

const ImageGallery: FC<ImageGalleryProps> = ({ images , onImageClick}) => {
    return (
        <ul className={css.imageGallery}>
            {images.map((image: Image) => {
                return (
                    <li key={image.id} className={css.imageGalleryItem} >
                        <ImageCard onClick={() => onImageClick(image)} image={image} />
                    </li>
                );
            })}
        </ul>
    );
};

export default ImageGallery;