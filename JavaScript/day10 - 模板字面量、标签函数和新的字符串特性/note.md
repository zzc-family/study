## 模板字面量
#### 带标签
+ 在不带标签的模板字面量中，如果表达式的结果不是字符串，他将被转换为字符串类型。<br />如果你的代码需要使用实际的美元符号，请转义美元符号
> console.log(`Not a substitution: \${foo}`);  //Not a substitution: ${foo}
+ 与字符串字面量不同，模板字面量可包含未转义的换行符，这些换行符保留在模板中
```
    console.log(`Line 1
    Line 2`);
    /*
       输出：
        Line 1
            Line 2
    */
```
+ 表达式中的空格不会包含在字符串中
```
const a = ["one", "two", "three"];
console.log(`Complex: ${
    a.reverse()
     .join()
     .toUpperCase()
`); // Complex: THREE,TWO,ONE
```

#### 不带标签
1. 基本标签函数
```
// 确定参数的情况下
function example(template, value0, value1, value2) {
    console.log(template);
    console.log(value0, value1, value2);
}
const a = 1, b = 2, c = 3;
example`Testing ${a} ${b} ${c}.`;

// 不确定参数的情况下
function example2(template, ...values) {
    console.log(template);
    console.log(values);
}
const a1 = 1, b1 = 2, c1 = 3;
example2 `Testing ${a1} ${b1} ${c1}.`;
```
输出结果
```
// 确定参数的情况下
["Testing ", " ", " ", " ", ","];
1, 2, 3

// 不确定参数的情况下
["Testing ", " ", " ", " ", ","];
[1, 2, 3]
```
2. 获取非字符串值得标签函数
```
const logJSON = (template, ...values) => {
    let result = template[0];
    for(let index = 1; index < template.length; ++index){
        result += JSON.stringify(values[index - 1]) + template[index];
    }
    console.log(result);
}
const a = [1, 2, 3];
const o = {"answer": 42};
const s = "foo";
logJSON`Logging: a = ${a} and o = ${o} and s = ${s}`;
```

## 代码单元和码点知识点略过
## 新字符串方法
### `String.prototype.repeat`
> console.log("n".repeat(3)); // nnn

### `String.prototype.startsWith`和`endsWith`<br />
检查字符串是否以子字符串开头或以子字符串结尾(有一个标识起始或结束索引的可选参数)
```
console.log("testing".startsWith("test")); // true
console.log("testing".endsWith("ing")); // true
console.log("testing".endsWith("foo")); // false
```
传入空子字符串，`startsWith`和`endsWith`都将返回true<br />
`console.log("foo".startsWith(""))`
如果向`startsWith`传入一个起始索引，则它会认为该字符串是从该索引开始的
```
console.log("now testing".startsWith("test")); //false
console.log("now testing".startsWith("test", 4)); // true
```
### `String.prototype.padStart`和`padEnd`
```
const s = "example";
console.log(`|${s.padStart(10)}|`); // => "|   example|"
console.log(`|${s.padEnd(10)}|`);  // "|example   |"

console.log(`|${s.padStart(10, "-")}|`); // => "|---example|"
console.log(`|${s.padEnd(10, "-")}|`);  // "|example---|"

// 填充字符串的长度可超过一个字符，必要时可重复或截断该字符串
console.log(`|${s.padStart(10, "-*")}|`);  // "|-*-example|"
console.log(`|${s.padEnd(10, "-*")}|`); // "|example- *-|"
```