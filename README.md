# router-transition

一个控制 vue 项目中的前进后退效果的 demo，有待在实际 h5 项目中实践

## 运行

```
npm run serve
```

## 思路

拦截 vue-router 的 beforeEach 和 afterEach，如果进入的路由之前没保存过，则将进入的路由保存在 sessionStorage 中，否则进入路由时通过之前保存的数据计算是前进还是后退，然后通过改变 transition 的 class 来改变路由切换时的样式

[] 如果多个项目之前跳转是什么效果？

## 参考

[vux](https://github.com/airyland/vux)
