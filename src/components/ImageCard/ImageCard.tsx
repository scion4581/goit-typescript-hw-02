import { FC } from 'react';
import css from './ImageCard.module.css';
import { Image } from '../../types';

interface ImageCardProps {
    image: Image,
    onClick: () => void
}

const ImageCard: FC<ImageCardProps> = ({ image: { urls, alt_description }, onClick }) => {
    return (
        <div>
            <img onClick={onClick} className={css.imageGalleryImage} src={urls.small} alt={alt_description} />
        </div>            
    );
}

export default ImageCard;