import axios, {AxiosInstance} from 'axios';
import {stringify} from 'qs';
import {HttpResponse} from './http.interface';

// 创建新的 httpInstance 实例，保持原有 axios 实例不被污染
const httpInstance: AxiosInstance = axios.create();

// 请求拦截器 越在后面，越先执行
httpInstance.interceptors.request.use((config => {
  if (config.method === 'post' || config.method === 'put') {// 如果是 post 或者 put
    if (config.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') !== -1) {
      // 拿到 body 数据
      const body = config.data;
      if (body && !body.hasOwnProperty('REACT_KIT_NO_PARSE_FORM_BODY')) {// 默认序列化
        config.data = stringify(body);
      } else {
        // 删除 REACT_KIT_NO_PARSE_FORM_BODY
        delete body['REACT_KIT_NO_PARSE_FORM_BODY'];
      }
    }
  }
  return config;
}));

// 请求类型
type HttpRequestType = 'GET' | 'POST' | 'PUT' | 'DELETE';

const httpService = {
  /**
   * 发送请求，传入请求类型
   * @param type    请求类型
   * @param url     请求地址
   * @param params  请求参数
   * @param options 其他选项
   */
  request(type: HttpRequestType, url: string, params: any = {}, options: any = HttpContentType.FORM): Promise<HttpResponse> {
    switch (type) {
      case 'GET':
        return this.get(url, params, options);
      case 'POST':
        return this.post(url, params, options);
      case 'PUT':
        return this.put(url, params, options);
      case 'DELETE':
        return this.delete(url, params, options);
      default:
        return this.get(url, params, options);
    }
  },
  /**
   * GET请求
   * @param url     请求地址
   * @param params  请求参数
   * @param options 其他选项
   */
  get(url: string, params: any = {}, options: any = HttpContentType.FORM): Promise<HttpResponse> {
    // 合并
    options = {...options, params: params};

    return httpInstance.get(url, options)
        .then(function (response) {
          return handleResponseSuccess(response);
        })
        .catch(function (error) {
          return handleResponseError(error);
        });
  },
  /**
   * DELETE请求
   * @param url     请求地址
   * @param params  请求参数
   * @param options 其他选项
   */
  delete(url: string, params: any = {}, options: any = HttpContentType.FORM): Promise<HttpResponse> {
    // 合并
    options = {...options, params: params};

    return httpInstance.delete(url, options)
        .then(function (response) {
          return handleResponseSuccess(response);
        })
        .catch(function (error) {
          return handleResponseError(error);
        });
  },
  /**
   * PUT请求
   * @param url     请求地址
   * @param params  请求参数
   * @param options 其他选项
   */
  put(url: string, params: any = {}, options: any = HttpContentType.FORM): Promise<HttpResponse> {
    // 解析
    return httpInstance.put(url, params, options)
        .then(function (response) {
          return handleResponseSuccess(response);
        })
        .catch(function (error) {
          return handleResponseError(error);
        });
  },
  /**
   * POST请求
   * @param url     请求地址
   * @param params  请求参数
   * @param options 其他选项
   */
  post(url: string, params: any = {}, options: any = HttpContentType.FORM): Promise<HttpResponse> {
    // 解析
    return httpInstance.post(url, params, options)
        .then(function (response) {
          return handleResponseSuccess(response);
        })
        .catch(function (error) {
          return handleResponseError(error);
        });
  }
};

export {httpInstance, httpService, HttpRequestType};

const HttpContentType = {
  FORM: {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
  JSON: {headers: {'Content-Type': 'application/json'}}
};

/**
 * 处理成功
 */
function handleResponseSuccess(res: any): HttpResponse {
  const httpResponse = getHttpResponseObj();

  httpResponse.flag = true;
  httpResponse.message = '';
  httpResponse.data = res.data;

  return httpResponse;
}

/**
 * 处理失败
 */
function handleResponseError(error: any): HttpResponse {
  const httpResponse = getHttpResponseObj();

  httpResponse.flag = false;
  httpResponse.error = error;
  httpResponse.message = error.response ? (error.response.statusText ? error.response.statusText : '') : '';

  return httpResponse;
}

/**
 * 生成HttpResponse对象
 */
function getHttpResponseObj(): HttpResponse {
  return {
    flag: false,
    message: null,
    data: null,
    error: null
  };
}
