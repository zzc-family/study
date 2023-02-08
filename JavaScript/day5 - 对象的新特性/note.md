## 对象的新特性
#### Symbol
1. `Symbol.toStringTag` 是一个内置的 `symbol` ，许多内置的 Javascript 对象类型即便没有 `toStringTag` 属性,也能被 `toString()` 方法识别并返回特定的类型标签
    ```
    Object.prototype.toString.call("foo"); // [object String]
    Object.prototype.toString.call("[1, 2]"); // [object String]
    Object.prototype.toString.call(3); //  [object Number]
    Object.prototype.toString.call(true); //  [object Boolean]
    Object.prototype.toString.call(undefined); // [object Undefined]
    Object.prototype.toString.call(null); //[object Null]
    
    // toString() 能识别他们是因为引擎为他们设置好了 toStringTag 标签
    Object.prototype.toString.call(new Map()); // [object Map]
    Object.prototype.toString.call(function* (){}); // [object GeneratorFunction]
    Object.prototype.toString.call(Promise.resolve()); // [object Promise]
    
    // 自己创建的类不会有这份特殊待遇 toString() 找不到 toStringTag 属性时只好返回默认的 Object 标签
    class ValidatorClass {}
    Object.prototype.toString(new ValidatorClass); // [object Object]
    
    // 加上 toStringTag 属性，你的类也会有自定义的类型标签了
    class ValidatorClass {
        get [Symbol.toStringTag]() {
            return "Validator"
        }
    }
    Object.prototype.toString(new ValidatorClass); // [object Object]
    ```
   
2. 创建使用`Symbol`
   通过调佣 `Symbol` 方法，我们可得到一个全新且唯一的 `Symbol` 值，但 `Symbol` 方法并不是构造函数，而是原始数据类型，所以不需要 `new` ，一旦你定义了自己的 `Symbol` ，就可在创建对象时通过可计算属性的方式将其添加到对象上，或者在创建对象后通过中括号的方式使用
   ```
   const mySymbol = Symbol();
   cont obj = {
        [mySymbol]: 6
   };
   const anotherSymbol = Symbol();
   obj[anotherSymbol] = 7;
   console.log(obj[mySymbol]); //6
   console.log(obj[anotherSymbol]); // 7
   ```
   为了方便调试，可在创建 `Symbol` 时添加描述，可通过给 `Symbol` 传入一个字符串来实现这一点
   ```
   const mySymbol = Symbol("my Symbol")
   console.log(mySymbol.description); // Symbol(my Symbol)
   ```
   `description` 字段只是单纯地描述，没有其他的含义（随后你将看到 `Symbol.for` 中的描述可用于其他的目的）。描述并不是 `Symbol` 的值，并且两个不同的 `Symbol` 可有同样的描述，但仍然是两个不同的 Symbol 值
   ```
   const a = Symbol("my Symbol");
   console.log(a);
   const b = Symbol("my Symbol");
   console.log(b);
   console.log( a === b );
   const obj = {
        [a]: 6,
        [b]: 7
   }
   console.log(a);
   console.log(b);
   ```
   并且 Symbol 定义的属性，不会被包含在 for-in 循环或者由 Object.keys 返回的数组中，即便他们是可枚举属性(在Object.keys中，                                                                                                                  还/0要求是自身属性)

#### 对象的新特性
1. `Object.assign()`
2. `Object.is()`
    类似于 `===`,除了以下2点<br/>
    + console.log(Object.is(+0, -0)); // false
    + console.log(Object.is(NaN, NaN)); // true
3. `Object.values`:
    > const obj = { a: 1, b: 2, c: 3 }; <br />
     console.log(Object.values(obj)); //[1, 2, 3]
4. `Object.entries`: 遍历自身的、可枚举的字符串类型的属性，并返回一个`[name, value]`结构的数组
    ```
    const obj = {
        a: 1,
        b: 2,
        c: 3
    };
    console.log(Object.entries(obj)); //[["a", 1], ["b", 2], ["c", 3]]
    ```
5. `Object.fromEntries`: 接受一个键/值对组成的列表（任意可迭代的对象）,然后根据该列表创建一个对象
    ```
   const obj = Object.fromEntries({
        ["a", 1],
        ["b", 2],
        ["c", 3]
   })
   console.log(obj); // { a: 1, b: 2, c: 3 }
   ```
   `fromEntries`与`Object.entries`相对应。他也可将`Map`类型转换为对象。因为`Map.prototype.entries`返回的列表恰好是`Object.fromEntries`所需要的参数。
6. `Object.getOwnPropertySymbols()` <br />
    它返回的是一个对象自身的`Symbol`类型的属性键数组(而Object.getOwnPropertyNames返回的是字符串类型的属性键数组)
7. `Object.getOwnPropertyDescriptors` <br />
    该方法返回一个对象，该对象拥有原对象自身的全部属性(包括不可枚举的属性和`Symbol`类型的属性) <br />
    该方法的一个使用场景是：通过 `Object.defineProperties` 将返回的对象传递给另一个对象，从而把相关的定义复制到目标对象上
    ```
   const s = Symbol("example");
   const ol = {
        // A property named with a Symbol
        [s]: "one",
        // An accessor property
        get example(){
            return this[s];
        },
        set example(value){
            this[s] = value;
        },
        // A data property
        data: "value"
   };
   // A non-enumerable property
   Object.defineProperty(ol, "nonEnum", {
        value: 42,
        writable: true,
        configurable: true
   });
   // Copy those properties to a new Object
   const descriptors = Object.getOwnPropertyDescriptors(ol);
   const o2 = Object.defineProperties({}, descriptors);
   console.log(o2.example); // one
   o2.example = "updated";
   console.log(o2[s]);  // "updated", the accessor property wrote to the [s] property
   console.log(o2.nonEnum); //42
   conosle.log(o2.data); // value
   ```
   在相同的场景下，Object.assign并不能复制访问器属性，而是发自该方法被调用时访问器返回的值。同时，Object.assign 不能复制不可枚举的类型