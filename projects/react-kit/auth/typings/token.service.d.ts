import { TokenConfig, TokenModel } from './token.interface';
/**
 * 设置token数据
 */
export declare function set(data: TokenModel, tokenConfig: TokenConfig): void;
/**
 * 获取token数据
 */
export declare function get(tokenConfig: TokenConfig): TokenModel;
/**
 * 清空token数据
 */
export declare function clear(tokenConfig: TokenConfig): void;
