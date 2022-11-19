### 索引签名类型
数组
```
interface IArrary<T> {
    [key: number]: T
}
```
---
对象
```
interface IObject {
    [key: string]: number 
}
```
---
### 映射类型 - 基于旧类型创建新类型
```
type PropKeys = "x" | "y" | "z";
type Type1 = { x: number; y: number; z: number };
// 简化为 - 联合类型中的使用
type Type2 = { [key in PropKeys]: number }

// 对象中使用
type Props = { a: number; b: string; c: boolean }
type Type3 = { [key in keyof Props]: number }
// 首先先执行`keyof Props`获取到对象类型`Props`中所有键的联合类型，即`a | b | c`
// 然后，`key in ...`就表示`key`可以是`Props`中所有的键名称中的任意一个
```
注意：
+   映射类型是基于索引签名类型的，所以，该语法类似于索引签名类型，也使用了`[]`
+   `Key in PropKeys`表示`Key`可以是`PropKeys`联合类型中的任意一个，类似于`for(let key in obj)`
+   使用映射类型创建的新对象类型`Type2`和类型`Type1`结构完全相同
+   映射类型只能在类型别名中使用，不能在接口中使用

---
### 索引查询类型
```
type Props = { a: number; b: string; c: boolean } 
type TypeA = Props["a | b"]; // string | number
type TypeA = Props[keyof Props] // string | number | boolean
```