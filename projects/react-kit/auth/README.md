# react-kit/auth
------
token处理工具（注：依赖 @react-kit/http ）

# 特点
> * 处理 token 的保存、获取、删除
> * 内置 token 拦截器，根据需要使用
> * 使用 typescript 编写，内置 ts 声明文件 在编译器下获得友好的代码提示

# 示例
```js
import {TokenService, TokenStoreType} from '@react-kit/auth';

// 创建一个service对象，可传入配置，不传则使用默认值
const tokenService = new TokenService({
    token_send_key_header: 'Authorization',
    token_send_template_header: 'Bearer ${token}',
    token_store_key: 'token',
    token_store_type: TokenStoreType.LocalStorage
});

// 设置
tokenService.set({token: '123456'});

// 获取
tokenService.get();

// 清除
tokenService.clear();

// 增加token拦截器(自动将token添加到请求头中)
tokenService.addTokenInterceptors();

```

