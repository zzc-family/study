## 安全模式

避免实例化的时候 没有写 new 关键字报错

```javascript
const Books = function (bookName, bookDesc) {
  this.bookName = bookName;
  this.bookDesc = bookDesc;
};
const book = Books("大前端", "无限好");
console.log(book); // undefined
console.log(window.bookName); // 大前端
console.log(window.bookDesc); //无限好
```

`new` 关键词的作用可以看作是当前对象`this`不停的复制。 然而，例子中没有用`new`,所以会直接执行这个函数，这个函数在全局作用域环境中执行了,所以在全局作用域中`this`指向的当前对象自然就是全局变量`window`，所以添加的属性自然会被添加到`window`

```javascript
const Books = function (bookName, bookDesc) {
  if (this instanceof Books) {
    this.bookName = bookName;
    this.bookDesc = bookDesc;
  } else {
    return new Books(bookName, bookDesc);
  }
};
const book = Books("大前端", "无限好");
console.log(book); // undefined
console.log(window.bookName); // 大前端
console.log(window.bookDesc); //无限好
```
