## 块级作用域
+ var 声明会跳出块级作用域。如果在块内使用 var 声明一个变量，那么你不仅可在该块内的作用域访问该变量，还可以在块外面的作用域访问他
```
function jumpOut(){
    var a = [1, 2, 3];
    for( var i = 0; i < a.length; ++i){
        var value = a[i];
        console.log(value);
    }
    console.log("Outside loop " + value)
}
jumpOut();
```

+ let 和 const 通过真正的块级作用域来解决这个问题：用 let 和 const 声明的变量只存在于声明时所在的块。
```
function stayContained(){
    var a = [1, 2, 3];
    for( var i = 0; i < a.length; ++i ){
        let value = a[i];
        console.log(value);
    }
    console.log("Outside loop" + value); // 报错 “value” is not defined
}
stayContained();
```
## var 关键词允许重复声明，let 和 const 重复声明将抛出错误
## 变量提升和暂时性死区      

## 逗号表达式
> return a,b; // 语句的结果是 b 的值
```
// 常规
handlers = handlers.map(function(handler) {
    unregister(handler);
    return register(handler.item);
});

// 箭头函数
handlers = handlers.map(handler => {
    unregister(handler);
    return register(handler.item);
});

// 逗号操作符 + 箭头函数
handlers = hadnlers.map(handler =>
    (unregister(handler), register(handler.item))
);
```