import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Image } from '../../types';
import axios from 'axios';

import UnsplashAPI from '../../UnsplashAPI';
import css from './App.module.css';
import ImageModal from '../ImageModal/ImageModal';
import { isArrayEmpty } from '../../utils';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

const UNSPLASH_ACCESS_KEY = '5KC85giyG2o5aaS-dCVULk4D5dx8B3tu4xbyoL2xLRY';
const searchAPI = new UnsplashAPI(UNSPLASH_ACCESS_KEY);
const PER_PAGE = 12;

Modal.setAppElement('#root');

function App() {

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showLoadMoreBtn, setShowMoreLoadBtn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [images, setImages] = useState<Image[] | []>([]);
  const [imageForModal, setImageForModal] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleImageClick = (image: Image): void => {
    setImageForModal(image);
    setIsModalOpen(true);
  }
  
  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setImageForModal(null);
  }

  const handleUpdateImageGallery = (nextImages: Image[] | []): void => {
    setImages((existingImages) => {
      return [
        ...existingImages,
        ...nextImages
        ]
    });
  };

  const handleSearchQuery = (searchQuery: string): void => {
    setPageNumber(1);
    setImages([]);
    setShowMoreLoadBtn(false);
    setSearchQuery(searchQuery);
  };

  useEffect((): void => {

    if (searchQuery === '') {
      return;
    }

    async function searchImages(): Promise<void> {
      try {
        setShowLoader(true);
        const foundImages = await searchAPI.searchImages({
          query: searchQuery,
          page: pageNumber,
          per_page: PER_PAGE
        });
        handleUpdateImageGallery(foundImages);
        if (!isArrayEmpty(foundImages)) {
          setShowMoreLoadBtn(foundImages.length > 0);
          setErrorMessage('');
        } else {
          setErrorMessage('There is no results. Try to change the search query');
        }
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.message);
        } else {
          console.error(error);
        }
        setImages([]);
      } finally {
        setShowLoader(false);
      }
    }
    
    searchImages();  
  }, [searchQuery, pageNumber]);

  return (
    <div className={css.container}>
      {imageForModal && <ImageModal isOpen={isModalOpen} image={imageForModal} onClose={handleCloseModal} />}
      <div><Toaster position="top-right" reverseOrder={false}/></div>
      <SearchBar onSearch={handleSearchQuery} />
      {errorMessage && <div className={css.error}>{errorMessage}</div>}
      {images.length > 0 && <ImageGallery images={images} onImageClick={handleImageClick} /> }
      {showLoader && <Loader /> }
      {showLoadMoreBtn && !errorMessage && <LoadMoreBtn onClick={() => setPageNumber(pageNumber + 1)} /> }
    </div>
  )
}

export default App;
