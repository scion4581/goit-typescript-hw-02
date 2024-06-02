import Modal, { Styles } from 'react-modal';
import { FC } from 'react';
import css from './ImageModal.module.css';
import { Image } from '../../types';

interface ImageModalProps {
    image: Image,
    isOpen: boolean,
    onClose: () => void
}  

const ImageModal: FC<ImageModalProps> = ({image, isOpen, onClose }) => {
  
const modalStyles: Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    border: 'none'
  }
};

const modalOverlayStyles = {
  base: css.imageModalOverlay,
  afterOpen: css.imageModalOverlayAfterOpen,
  beforeClose: css.imageModalOverlayBeforeClose
}  

    return (
        <Modal
        style={modalStyles}
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={onClose}
        overlayClassName={modalOverlayStyles}
        closeTimeoutMS={500}
        >
        <img src={image.urls.regular} />
        </Modal>
    );
};

export default ImageModal;