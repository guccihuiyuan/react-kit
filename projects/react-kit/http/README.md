# react-kit/http
------
基于Promise的HTTP请求工具

# 特点
> * 支持 angular、react、vue 使用
> * 基于 axios 封装，更友好的调用方式
> * 使用 typescript 编写，内置 ts 声明文件 在编译器下获得友好的代码提示
> * 内置拦截器，处理 POST 和 PUT 下 FORM 表单形式提交的参数处理
> * 更友好的响应参数格式
> * 支持外部继续叠加 自定义拦截器
> * 不污染原生 axios API

# 示例
```js
import {httpInstance, httpService} from '@react-kit/http';

// GET请求
httpService.get('/test', {a: 1, b: 2}).then(res => {
   if (res.flag) {
       // 正确的请求
   } 
});
// POST请求
httpService.post('/test', {a: 1, b: 2}).then(res => {
   if (res.flag) {
       // 正确的请求
   } 
});
// PUT请求
httpService.put('/test', {a: 1, b: 2}).then(res => {
   if (res.flag) {
       // 正确的请求
   } 
});
// DELETE请求
httpService.delete('/test', {a: 1, b: 2}).then(res => {
   if (res.flag) {
       // 正确的请求
   } 
});
// 带请求类型的请求
httpService.request('GET', '/test', {a: 1, b: 2}).then(res => {
   if (res.flag) {
       // 正确的请求
   } 
});

// 自定义拦截器，注意（后面定义的先执行，前面定义的后执行）
// 请求拦截器
httpInstance.interceptors.request.use((config => {
   return config;
}));
// 响应拦截器
httpInstance.interceptors.response.use((config => {
    return config;
}));
```

