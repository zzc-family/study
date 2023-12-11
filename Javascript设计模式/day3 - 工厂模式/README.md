### 简单工厂模式

```javascript
// 创建Java学科类
const Java = function (content) {
  // ...
};
// 创建 PHP 学科类
const Php = function (content) {
  //...
};
// 创建 JavaScript 学科
const Javascript = function (content) {
  // ...
};

// 学科类工厂
function JobFactory(type, content) {
  switch (type) {
    case "java":
      return new Java(content);
    case "php":
      return new Php(content);
    case "Javascript":
      return new Javascript(content);
  }
}
```

### 工厂模式

```javascript
const Factory = function (type, content) {
  if (this instanceof Factory) {
    return new this[type](content);
  }
};

Factory.prototype = {
  Java: function (content) {},
  UI: function (content) {},
  Javascript: function (content) {},
};
```
