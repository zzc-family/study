## [Map](https://zhuanlan.zhihu.com/p/622902710)

特点：

+ 键和值都可以是任何值（包括对象）
+ 规定条目的顺序为添加的顺序（更新条目的值时不会改变顺序）
+ JavaScript引擎对Map的优化有别于对对象的优化，因为他们使用场景不同
+ Map默认是空的
+ 在尝试匹配键时没有强制类型的转换，一个键总是不同于另一个类型的键（“1”和1是不同的键）
+ 一个对象和另一个对象总是不同的键，即使他们具有相同的属性
+ NaN，undefined，null可以用作键，但是不能有值为`-0`的键,表现于`0`一致

### Map的基本操作

> const m = new Map();

1. 添加条目

> m.set(60, "sixty");<br />
> m.set(4, "four");<br />
> m.set(60, "sixty").set(4, "four")

2. 获取映射中条目的数量

> m.size() // Entries: 4

3. 获取键对应的值,没有对应返回时，返回undefined

> m.get(60)

4. 删除条目

> m.delete(4)

5. 检查映射中是否存在某个条目

> m.has(7)

6. 清空映射中所有的条目

> m.clear()

### 从可迭代对象中创建Map

通过传入一个可迭代对象（通常是数组的数组）来提供映射的条目

```
const m = new Map([
    ["one", "uno"],
    ["two", "due"],
    ["three", "tre"]
])
console.log(m.size); // 3
console.log(m.get("two")); //due
```

可通过将映射传入`Map`构造函数来实现映射的复制

```
const m = new Map([
    ["one", "uno"],
    ["two", "due"],
    ["three", "tre"]
])
const m2 = new Map(m);
console.log(m2.get("two"))
```

### 迭代Map的内容

```
const m = new Map([
    ["one", "uno"],
    ["two", "due"],
    ["three", "tre"]
])
for(const [key, value] of m){
    console.log(key + ": " + value);
}

for(const entry of m){
    console.log(entry[0] + ": " + entry[1]);
}

for(const key of m.keys()){
    console.log(key);
}

for(const value of m.values()){
    console.log(value)
}

m.forEach((value, key) => console.log(key, value))
```
