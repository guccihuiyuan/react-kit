import {TokenConfig, TokenModel} from './token.interface';
import {TokenStoreType} from './token.enum';

/**
 * 设置token数据
 */
export function set(data: TokenModel, tokenConfig: TokenConfig) {
    const token_store_type = tokenConfig.token_store_type;

    switch (token_store_type) {
        case TokenStoreType.LocalStorage:
            localStorage.setItem(tokenConfig.token_store_key, JSON.stringify(data));
            break;
        case TokenStoreType.SessionStorage:
            sessionStorage.setItem(tokenConfig.token_store_key, JSON.stringify(data));
            break;
        default:
            localStorage.setItem(tokenConfig.token_store_key, JSON.stringify(data));
    }
}

/**
 * 获取token数据
 */
export function get(tokenConfig: TokenConfig) {
    const token_store_type = tokenConfig.token_store_type;

    switch (token_store_type) {
        case TokenStoreType.LocalStorage:
            return (JSON.parse(localStorage.getItem(tokenConfig.token_store_key) || '{}') || {}) as TokenModel;
        case TokenStoreType.SessionStorage:
            return (JSON.parse(sessionStorage.getItem(tokenConfig.token_store_key) || '{}') || {}) as TokenModel;
        default:
            return (JSON.parse(localStorage.getItem(tokenConfig.token_store_key) || '{}') || {}) as TokenModel;
    }
}
/**
 * 清空token数据
 */
export function clear(tokenConfig: TokenConfig) {
    const token_store_type = tokenConfig.token_store_type;

    switch (token_store_type) {
        case TokenStoreType.LocalStorage:
            localStorage.removeItem(tokenConfig.token_store_key);
            break;
        case TokenStoreType.SessionStorage:
            sessionStorage.removeItem(tokenConfig.token_store_key);
            break;
        default:
            localStorage.removeItem(tokenConfig.token_store_key);
    }
}
