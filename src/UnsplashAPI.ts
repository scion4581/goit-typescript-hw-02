import axios, { AxiosInstance } from 'axios';
import { Image } from './types';

const UNSPLASH_API_URL = 'https://api.unsplash.com/';

type UrlParams = {
  query: string,
  page: number,
  per_page: number
};

type ImagesResponse = Promise<Image[] | []>;

export default class UnsplashAPI {
  #httpClient: AxiosInstance;
  constructor(apiKey: string) {
    this.#httpClient = axios.create({
      baseURL: UNSPLASH_API_URL,
      params: {
        client_id: apiKey,
        orientation: 'landscape',
      },
    });
  }

  searchImages(urlParams: UrlParams): ImagesResponse {
    return this.#fetch('/search/photos', urlParams);
  }

  async #fetch(resourcePath: string, urlParams: UrlParams): ImagesResponse {
    const response = await this.#httpClient.get(resourcePath, { params: urlParams });
    return response.data.results;
  }
}