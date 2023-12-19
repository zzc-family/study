## Reflect

+ <a href="#apply">Reflect.apply</a>
+ <a href="#constructor">Reflect.Constructor</a>
+ <a href="#ownKeys">Reflect.OwnKeys</a>
+ <a href="#get">Reflect.get和Reflect.set</a>
+ <a href="#other">其他Reflect函数</a>

### <div id="apply">Reflect.apply</div>

以指定的`this`值以及参数列表调用函数，参数列表为数组（或类数组对象）形式

```
function example(a, b, c){
    console.log(`this.name = ${this.name}, a = ${a}, b =${b}, c = ${c}`);
}
const thisArg = {name: "test"};
const args = [1, 2, 3];

Reflect.apply(example, thisArg, args); // this.name = test, a = 1, b = 2, c = 3;
// 可替换为
example.apply(thisArg, args);
```

但是，`Reflect.apply`具有如下优点

+ 即便示例中的`apply`属性已被`Function.prototype.apply`之外的方法覆盖或者重写，它照样可以生效。
+ 一个细微的变化：它适用于真正晦涩难懂的情况，即函数的原型被更改（例如，使用`Object.setPrototypeOf`
  方法修改了原型），此时该函数不在继承自`Funtion.prototype`，如此一来，函数就没有`apply`方法了。

### <div id="constructor">Reflect.constructor</div>

提供了 new 操作符不具备的2个特性

1. 构造函数可接受数组（或类数组对象）参数

    ```
    // 需要向构造函数Thing传入数组结构的参数
    
    // In ES5
    const o = Thing.apply(Object.create(Thing.prototype), theArguments);
    // In ES5+
    let o = new Thing(...theArguments);
    // or
    let o = Reflect.constructor(Thing, thisArguments);
        
    ```

2. 允许将 new.target 设置为你所调用的函数以外的对象

    ```
    // Defining th function that builds custom errors
    function buildCustomError(...args){
        return Reflect.constructor(Error, args, buildCustomError);
    }
    
    buildCustomError.prototype = Object.assign(Object.create(Error.prototype), {
        constructor: buildCustomError,
        report(){
            console.log("this.message = " + this.message);
        }
    })
    
    // Using it
    const e = buildCustomError("error message here");
    console.log("instanceof Error", e instance Error);
    e.report();
    console.log(e);
    ```

   突出显示的一行调用了Error构造函数，但将传入的buildCustomError用作new.target参数，这意味着 buildCustomError.prototype
   被分配给了新创建的对象，而不是 Error.prototype。由此产生的实例继承了自定义的 report 方法。

### <div id="ownKeys">Reflect.ownKeys</div>

返回的数组包含对象自身所有的属性键，包括不可枚举的和以 Symbols(而非字符串)
命名的键。相当于Object中的`Object.getOwnPropertyNames`和`Object.getOwnPropertySymbols`的组合。

```
Reflect.ownKeys({z: 3, y: 2, x: 1}); // [ "z", "y", "x" ]
Reflect.ownKeys([]); // ["length"]

var sym = Symbol.for('comet');
var sym2 = Symbol.for('meteor');
var obj = {[sym]: 0, 'str': 0, '773': 0, '0': 0,
           [sym2]: 0, '-1': 0, '8': 0, 'second str': 0};
Reflect.ownKeys(obj);
// [ "0", "8", "773", "str", "-1", "second str", Symbol(comet), Symbol(meteor) ]
// Indexes in numeric order, 
// strings in insertion order, 
// symbols in insertion order
```

### <div id="get">Reflect.get和Reflect.set</div>

1. Reflect.get

   > value = Reflect.get(target, propertyName[, receiver]);

    + target：是要获取的属性所在的对象
    + propertyName：是要获取的属性的名称
    + receiver: 可选参数，如果要获取的属性是访问器属性，那么receiver在访问器调用过程中被用作this对象。

2. Reflect.set

   > result = Reflect.set(target, propertyName, value[, receiver]);

    + value: 设置的值 <br />

   设置成功返回为True，否则返回false

### <div id="other">其他Reflect函数</div>

| 方法                       | 描述                                                                                    |
|--------------------------|---------------------------------------------------------------------------------------|
| defineProperty           | 与`Object.defineProperty`类似，但成功时返回true，失败返回 false，而不是抛出一个错误                            |
| getOwnPropertyDescriptor | `delete`操作符的函数版本，成功返回`true`,失败返回`false`,(在严格模式下，`delete`操作符会在失败时抛出一个错误)               |
| getPrototypeOf           | 与`Object.getPrototypeOf`类似，区别在于，如果你将非对象传递给他，他会抛出异常（而不是强制类型转换）                         |
| has                      | `in`运算符的函数版本(不像`hasOwnProperty`, `has`也会检查原型)                                         |
| isExtensible             | 与`Object.isExtensible`类似,区别在于，如果将非对象传递给他，他会抛出异常，而不是返回false                            |
| preventExtensions        | 与`object.preventExtensions`类似，区别在于：<br/> 1. 将非对象传递给他，会抛出一个错误<br/> 2. 如果操作失败，会返回 false |
| setPrototypeOf           | 与`Object.setPrototypeOf`类似，区别在于：<br/> 1. 将非对象传递给他，会抛出一个错误<br/> 2. 如果操作失败，会返回 false    |