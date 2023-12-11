## 继承

- <a href="#first">类式继承</a>
- <a href="#second">构造函数式继承</a>

### <div id="first">类式继承</div>

```javascript
// 声明父类
const SuperClass = () => {
  this.superValue = true;
};
// 为父类添加共有方法
SuperClass.prototype.getSuperValue = () => {
  return this.superValue;
};
// 声明子类
const SubClass = () => {
  this.subValue = false;
};

// 继承父类
SubClass.prototype = new SuperClass();
// 为子类添加共有方法
SubClass.prototype.getSubValue = () => {
  return this.subValue;
};
```

缺点：

1、由于子类通过其原型`prototype`对父类实例化，继承了父类。所以说，如果父类的共有属性是引用类型，就会在子类的所有实例中共用。

```javascript
function SuperClass() {
  this.books = ["javascript", "html", "css"];
}
function SubClass() {}

SubClass.prototype = new SuperClass();
const instance1 = new SubClass();
const instance2 = new SubClass();
console.log(instance2.books); //  ["javascript", "html", "css"]
instance1.books.push("设计模式");
console.log(instance2.books); // ["javascript", "html", "css", "设计模式"]
```

### <div id="second">构造函数式继承</div>

```javascript
const SuperClass = (id) => {
  this.books = ["javascript", "html", "css"];
  this.id = id;
};
// 父类声明原型方法
SuperClass.prototype.showBooks = function () {
  console.log(this.books);
};

const SubClass = (id) => {
  SuperClass.call(this, id);
};
const instance1 = new SubClass(10);
const instance2 = new SubClass(11);

instance1.books.push("设计模式");
console.log(instance1.books);
console.log(instance1.id);
console.log(instance2.books);
console.log(instance2.id);
```

> 缺点：
> 构造函数继承是通过在子类构造函数中调用父类构造函数来实现继承的。这种方式的缺点是无法继承父类原型上的方法和属性。而如果想要被子类继承就必须要放在构造函数中，这样创建出来的每个实例都会单独拥有一份而不能共用，这样就违背了代码复用的原则。

### <div id="third">组合式继承</div>

```javascript
const SuperClass = (name) => {
  this.books = ["javascript", "html", "css"];
  this.name = name;
};
// 父类声明原型方法
SuperClass.prototype.getName = function () {
  console.log(this.name);
};

const SubClass = (name, time) => {
  SuperClass.call(this, name);
  this.time = time;
};
SubClass.prototype = new SuperClass();
SubClass.prototype.getTime = function () {
  console.log(this.time);
};

// 测试代码
const instance1 = new SubClass("js book", 2014);
instance1.books.push("设计模式");
console.log(instance1.books); //  ["javascript", "html", "css", "设计模式"]
instance1.getTime(); // 2014
instance1.getName(); // js book

const instance2 = new SubClass("css book", 2013);
console.log(instance2.books); // ["javascript", "html", "css"]
instance2.getTime(); // css book
instance2.getName(); // 2013
```

> 缺点：在使用构造函数继承时执行了一遍父类的构造函数，而在实现子类原型的类式继承又调用了一遍父类的构造函数。因此父类的构造函数调用了2遍

### <div id="fourth">原型式继承</div>

```javascript
function inheritObject(obj) {
  // 声明一个过渡函数对象
  function F() {}
  // 过渡对象的原型继承父对象
  F.prototype = obj;
  // 返回过渡对象的一个实例，该实例的原型继承了父对象
  return new F();
}
```

> 缺点：跟类式继承一致

### <div id="fifth">寄生式继承</div>

```javascript
function inheritObject(obj) {
  // 声明一个过渡函数对象
  function F() {}
  // 过渡对象的原型继承父对象
  F.prototype = obj;
  // 返回过渡对象的一个实例，该实例的原型继承了父对象
  return new F();
}
function createBook(obj) {
  const o = new inheritObject(obj);
  o.getName = function () {
    console.log(name);
  };
  return o;
}
```

### <div id="sixth">寄生式组合继承</div>

```javascript
function inheritObject(obj) {
  // 声明一个过渡函数对象
  function F() {}
  // 过渡对象的原型继承父对象
  F.prototype = obj;
  // 返回过渡对象的一个实例，该实例的原型继承了父对象
  return new F();
}
function inheritPrototype(subClass, superClass) {
  // 复制一份父类的原型副本保存在变量中
  const p = inheritObject(superClass);
  // 修正因为重写子类远些导致子类的 contructor 属性被修改
  p.constructor = superClass;
  // 设置子类的原型
  subClass.prototype = p;
}
```
