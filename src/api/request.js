export const sendRequest = async (instance, method, url, data, options = {}) => {
  try {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 요청 URL: ${instance.defaults.baseURL}${url}`);
      console.log(`🔍 요청 데이터: ${JSON.stringify(data, null, 2)}`);
    }

    const response = await instance({
      method,
      url,
      data,
      ...options,
    });

    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ ${url} -[${method}] 성공 응답:`, response);
    }

    return response;
  } catch (error) {
    console.error(`❌ ${url} -[${method}] 요청 실패:`, error.response || error.message);
    throw new Error(error.response?.data?.message || '요청 처리 중 오류가 발생했습니다.');
  }
};
