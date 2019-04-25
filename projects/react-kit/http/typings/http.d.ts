import { AxiosInstance } from 'axios';
import { HttpResponse } from './http.interface';
declare const httpInstance: AxiosInstance;
/**
 * 请求类型
 */
declare type HttpRequestType = 'GET' | 'POST' | 'PUT' | 'DELETE';
declare const httpService: {
    /**
     * 发送请求，传入请求类型
     * @param type    请求类型
     * @param url     请求地址
     * @param params  请求参数
     * @param options 其他选项
     */
    request(type: HttpRequestType, url: string, params?: any, options?: any): Promise<HttpResponse>;
    /**
     * GET请求
     * @param url     请求地址
     * @param params  请求参数
     * @param options 其他选项
     */
    get(url: string, params?: any, options?: any): Promise<HttpResponse>;
    /**
     * DELETE请求
     * @param url     请求地址
     * @param params  请求参数
     * @param options 其他选项
     */
    delete(url: string, params?: any, options?: any): Promise<HttpResponse>;
    /**
     * PUT请求
     * @param url     请求地址
     * @param params  请求参数
     * @param options 其他选项
     */
    put(url: string, params?: any, options?: any): Promise<HttpResponse>;
    /**
     * POST请求
     * @param url     请求地址
     * @param params  请求参数
     * @param options 其他选项
     */
    post(url: string, params?: any, options?: any): Promise<HttpResponse>;
};
export { httpInstance, httpService, HttpRequestType };
