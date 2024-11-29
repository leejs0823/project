import axios from 'axios';
import { applyInterceptors } from './interceptor';

// .env로 숨긴 URL 주소
// eslint-disable-next-line no-undef
const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_URL;

// Axios 기본 인스턴스
const defaultInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Refresh 토큰 처리를 위한 옵션
});

// 인터셉터 적용
// applyInterceptors(defaultInstance);

// 추가 API 인스턴스
const createInstance = (baseInstance, path) => {
  const instance = axios.create(baseInstance.defaults);
  instance.defaults.baseURL += path;
  return instance;
};

const userInstance = createInstance(defaultInstance, '/users');
const friendInstance = createInstance(defaultInstance, '/users/friends');
const itemInstance = createInstance(defaultInstance, '/items');
applyInterceptors(itemInstance);
const purchaseInstance = createInstance(defaultInstance, '/purchase');
applyInterceptors(purchaseInstance);
const postInstance = createInstance(defaultInstance, '/posts');
applyInterceptors(postInstance);

export {
  defaultInstance,
  userInstance,
  friendInstance,
  itemInstance,
  postInstance,
  purchaseInstance,
};
