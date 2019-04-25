/**
 * 定义token存储类型
 */
import { TokenConfig, TokenModel } from './token.interface';
export declare class TokenService {
    private tokenConfig;
    /**
     * 初始化函数
     */
    constructor(tokenConfig?: TokenConfig);
    /**
     * 设置token
     */
    set(data: TokenModel): void;
    /**
     * 获取token
     */
    get(): TokenModel;
    /**
     * 清空token
     */
    clear(): void;
    /**
     * 添加token拦截器
     */
    addTokenInterceptors(): void;
}
