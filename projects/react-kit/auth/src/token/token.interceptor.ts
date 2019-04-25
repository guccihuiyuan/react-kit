import {httpInstance} from '@react-kit/http';
import {TokenConfig} from './token.interface';
import {get as getToken} from './token.service';

// 添加token拦截器
export function addTokenInterceptors(tokenConfig: TokenConfig) {
    // 获取配置信息
    const {token_send_key_header, token_send_template_header} = tokenConfig;

    // 获取token
    const tokenModel = getToken(tokenConfig);
    const tokenIgnores = tokenConfig.token_ignores;

    httpInstance.interceptors.request.use((config => {
        // 对不需要处理Token验证的不添加请求头
        if (tokenIgnores && tokenIgnores.length > 0) {
            for (const item of tokenIgnores as RegExp[]) {
                if (item.test(config.url)) {
                    // 直接返回
                    return config;
                }
            }
        }

        // 处理剩下需要Token验证的请求
        if (tokenModel.token) {
            // 获取token值
            const token = token_send_template_header.replace(/\$\{([\w]+)\}/g, tokenModel.token);

            // 默认将参数放入头部
            const tokenSendPlace = 'header';

            switch (tokenSendPlace) {
                case 'header':
                    config.headers[token_send_key_header] = token;
                    break;
            }
        }

        return config;
    }));
}
