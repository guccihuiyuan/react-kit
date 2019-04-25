import {TokenConfig, TokenModel} from './token.interface';
import {TokenStoreType} from './token.enum';
import {set as setToken, get as getToken, clear as clearToken} from './token.service';
import {addTokenInterceptors} from './token.interceptor';

/**
 * Token服务类
 */
export class TokenService {
    private tokenConfig: TokenConfig = {
        token_ignores: [],
        token_send_key_header: 'Authorization',
        token_send_template_header: 'Bearer ${token}',
        token_store_key: 'token',
        token_store_type: TokenStoreType.LocalStorage
    };

    /**
     * 初始化函数
     */
    constructor(tokenConfig?: TokenConfig) {
        if (tokenConfig) {
            if (tokenConfig.token_ignores) {
                this.tokenConfig.token_ignores = tokenConfig.token_ignores;
            }
            if (tokenConfig.token_send_key_header) {
                this.tokenConfig.token_send_key_header = tokenConfig.token_send_key_header;
            }
            if (tokenConfig.token_send_template_header) {
                this.tokenConfig.token_send_template_header = tokenConfig.token_send_template_header;
            }
            if (tokenConfig.token_store_key) {
                this.tokenConfig.token_store_key = tokenConfig.token_store_key;
            }
            if (tokenConfig.token_store_type) {
                this.tokenConfig.token_store_type = tokenConfig.token_store_type;
            }
        }
    }
    /**
     * 设置token
     */
    set(data: TokenModel) {
        setToken(data, this.tokenConfig);
    }
    /**
     * 获取token
     */
    get(): TokenModel {
        return getToken(this.tokenConfig);
    }
    /**
     * 清空token
     */
    clear() {
        clearToken(this.tokenConfig);
    }

    /**
     * 添加token拦截器
     */
    addTokenInterceptors() {
        addTokenInterceptors(this.tokenConfig);
    }
}

