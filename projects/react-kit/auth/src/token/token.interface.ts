import {TokenStoreType} from './token.enum';

export interface TokenModel {
  /**
   * token
   */
  token: string;
  /**
   * refresh_token
   */
  refresh_token?: string;
  /**
   * 其他
   */
  [key: string]: any;
}

/**
 * 可传入的配置信息
 */
export interface TokenConfig {
  /**
   * 哪些请求忽略Token
   */
  token_ignores?: RegExp[];
  /**
   * 发送Token认证请求的时候，header头中的key
   */
  token_send_key_header?: string;
  /**
   * 在每个请求头中放入token的模板字段（比如：Bearer ${token}，会解析成 Bearer + token）
   */
  token_send_template_header?: string;
  /**
   * localStorage的存储KEY值
   */
  token_store_key?: string;
  /**
   * 定义token存储类型
   */
  token_store_type?: TokenStoreType;
}
