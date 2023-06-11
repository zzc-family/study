## 新的数组方法
### `Array.of`
创建并返回一个包含传入的各个参数值的数组
```
const a = Array.of("one", "two", "three");
console.log(a); 

输出
["one", "two", "three"]
```

### `Array.from`
根据传入的参数创建数组<br />
+ 根据字符串的字符创建数组
```
    const str = "123;
    const a = Array.from(str);
    console.log(a); // 输出 [1, 2, 3]
```
+ 基于类数组对象创建数组
```
const a = Array.from({length: 2, "0": "one", "1": "two"});
console.log(a); // ["one", "two"];
```
+ 可接受第二个参数：mapFn<br/>
作用于每个被添加到数组中的值得映射函数
```
const str = "0123456789";
const a = Array.from(str, Number);
console.log(a); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```
映射函数的签名是 mapFn(value, index),接受索引作为第二参数，避免传入一个接受多个参数的函数，并由于他接受的第二个参数而出错
```
const str = "987654321";
const a = Array.from(str, parseInt);
console.log(a); // [9, NaN, NaN, NaN, NaN, 4, 3, 2, 1];
```
+ 第三个参数 thisArg<br />
该参数决定了 mapFn 被调用时 this 的值 <br />
`const array = Array.from(Array(100), example.method, example)` <br />
以确保在 method 调用中 this 指向的是 example 对象
---
### [Array.prototype.keys](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)
keys() 方法返回一个包含数组中每个索引键的 Array Iterator 对象。
```
const array1 = ['a', 'b', 'c'];
const iterator = array1.keys();

for (const key of iterator) {
  console.log(key);
}
// 0
// 1
// 2
```
```
var arr = ["a", , "c"];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2']
console.log(denseKeys);  // [0, 1, 2]
```
---
### [Array.prototype.values](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values)
为数组中空位设置了 undefined
```
const a = [ , "x", , , "y" ];
for(const value of a.values()){
    console.log(value);
}
// undefined
// x
// undefined
// undefined
// y
```
当从 values 迭代器中获取 undefined 值时，不能确定这是否意味着数组中有一个值为 undefined 的条目，因为它也有可能是稀疏数组中的一个空位。如果需要确定，可能就不应使用 values 方法了(不过你可能想到了 entries 方法)

---
### Array.prototype.entries
`entries`方法实际上是`keys`和`values`方法的组合：他返回数组中的条目迭代器，每个条目都是`[index, value]`的数组
```
const a = ["one", "two", "three"];
for(const entry of a.entries()){
    console.log(entry)
}
// [0, "one"]
// [1, "two"]
// [2, "three"]
```
与`keys`和`values`的情况一样，即使稀疏数组中不存在某一条目，迭代器也会包含该条目：与`values`不同的是，在`entries`方法中，可通过检查键（索引）是否存在于数组中，来区分获取的 undefined 值是一个空位还是实际的条目
```
const a = [ , undefined, , , "y"];
for(const [index, value] of a.entries()){
    console.log(index, value, index in a ? "present" : "absent");
}
// 0 undefined "absent"
// 1 undefined "present"
// 2 undefined "absent"
// 3 undefined "absent"
// 4 y "present"
```
---
### Array.prototype.copyWithin
将条目从数组的一部分复制到另一部分，在不增加数组长度的情况下处理可能存在的覆盖问题
签名：
> obj = theArray.copyWithin(target, start[, end]) 

你可以指定`target`索引（将复制的条目放在何处）、start索引(从哪里开始复制)，以及可选的`end`索引（在哪里停止复制，不包含该索引所在的位置；默认为数组长度）
```
const a = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
console.log("before", a);
a.copyWithin(2, 8);
console.log("after", a);
// 输出
// before ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]
// after  ["a", "b", "i", "j", "k", "f", "g", "h", "i", "j", "k"]
```
### Array.prototype.find
通过使用一个判定函数来查找数组中第一个匹配的条目的值。他会在数组的每个条目上调佣判定函数，在调用中可选择性的使用`thisArg`指定`this`的值，一旦判定函数返回真值，`find`方法将停止执行并返回对应条目的值，否则返回`undefined`(如果`find`访问完了所有条目)
```
const a = [1, 2, 3, 4, 5, 6];
const firstEven = a.find(value => value % 2 === 0);
console.log(firstEven); // 2
```
在一个空数组上调用`find`, 他总是返回`undefined`,因为在判定函数返回真值之前，find 已经访问完了所有条目
```
const x = [].find(value => true);
console.log(x); // undefined
```
访问的条目范围是在 find 开始循环之前确定的；条目的值是该条目被访问时的值（不会被预先存储）
+ 如果在结尾添加新的条目，那么这些条目将不会访问
+ 如果改变一个已经被访问过的条目，该条目将不会被访问
+ 如果改变一个尚未被访问的条目，那么当它被访问时，将使用新值
+ 如果从数组中删除条目，缩短数组的长度，那么 find 将会访问到末尾的空位（通常空位的值为undefined）
```
const a = ["one", "two", "three"];
const x = a.find((value, index) => {
    console.log(`Visiting index ${index}: ${value}`);
    if(index === 0){
        a[2] = a[2].toUpperCase();
    }else if(index === 1){
        a.push("four");
    }
    return value === "four";
})
console.log(x);
// Visiting index 0: one
// Visiting index 1: two
// Visiting index 2: THREE
// undefined
```
条目"four"没有被访问，因为当 find 开始时，该条目在访问范围之外，但该实例输出了大写的“THREE”, 因为在被访问之前，他已被修改。Find 还返回了 undefined（如console.log(x)的末尾所示），这是因为"four"条目从没被访问，判定函数从没返回真值

---
### Array.prototype.findIndex
+ 几乎与 find 完全一致，只是判定函数返回真值时 findIndex 返回条目的索引。如果没有相应的条目，findIndex则返回-1<br />
+ findIndex 访问的条目范围是事先确定的；访问的值与该条目被访问时的值一样；如果缩短数组的长度，findIndex会在最后访问到空位，空数组的findIndex总是返回-1
---
### Array.prototype.fill
使用给定的值填充数组（或类数组对象），可选择只填充由start和end索引定义的范围
```
const a = new Array(5).fill(44);
console.log(a); // [44, 44, 44, 44, 44]
```
常见的陷阱
```
const a = new Array(2).fill({});
a[0].name = "Joe";
a[1].name = "Bob";
console.log(a[0].name);
// Bob
```
`Array.fill({})`在数组的两个条目中放入了同一个对象，而不是用一些独立的对象来填充数组。这意味着 a[0] 和 a[1] 指向同一个对象。a[0].name = "Joe" 将这个对象的 name 设置为 Joe, 但是之后 a[1].name = "Bob" 用“Bob”覆盖了它。

解决方案
```
const a = Array.from({length: 2}, () => ({}));
a[0].name = "Joe";
a[1].name = "Bob";
console.log(a[0].name); //Joe

const a = Array(2).fill().map(v => ({}));
a[0].name = "Joe";
a[1].name = "Bob";
console.log(a[0].name); //Joe
// 这里需要调用 fill（用undefined来填充数组）,因为 map 不会访问不存在的条目，而 Array(2) 创建了一个 length = 2 但没有条目的数组
```

### Array.prototype.includes
签名：result = theArray.includes(value[, start]);
```
const a = [NaN];
console.log( a.indexOf(NaN) !== -1 ); // false
console.log( a.includes(NaN) ); // true
[-0].includes(0); //true
```

### Array.prototype.flat
扁平化数组 
```
const original = [
    [1, 2, 3],
    4, 
    5,
    [6, 7, 8]
]
const flattened = original.flat();
console.log(flattened); // [1, 2, 3, 4, 5, 6, 7, 8];
```
可设置一个可选的 depth 参数来指定 flat 进行递归扁平化的深度：1表示只有一层（默认）。无论结构有多深，都可使用 Infinity 来进行完全扁平化

---
### Array.prototype.flatMap
执行扁平化之前，每个值都会通过一个映射函数，并且只扁平化一级
```
const original = [1, 2, 3, 4];
const flattened = original.flatMap(e => e === 3 ? ["3a", "3b", "3c"] : e);
console.log(flattened); // [1, 2, "3a", "3b", "3c", 4]
```