## 总览

+ <a href="#num">Number 类型</a>
+ <a href="#string">String 类型</a>

### Number 类型

整数也可以用八进制（以 8 为基数）或十六进制（以 16 为基数）字面量表示。对于八进制字面量，
第一个数字必须是零（0），然后是相应的八进制数字（数值 0~7）。如果字面量中包含的数字超出了应
有的范围，就会忽略前缀的零，后面的数字序列会被当成十进制数，如下所示：

```
let octalNum1 = 070; // 八进制的 56 
let octalNum2 = 079; // 无效的八进制值，当成 79 处理
let octalNum3 = 08; // 无效的八进制值，当成 8 处理
``` 

八进制字面量在严格模式下是无效的，会导致 JavaScript 引擎抛出语法错误。①
要创建十六进制字面量，必须让真正的数值前缀 0x（区分大小写），然后是十六进制数字（0~9 以
及 A~F）。十六进制数字中的字母大小写均可。下面是几个例子：

```angular2html
let hexNum1 = 0xA; // 十六进制 10
let hexNum2 = 0x1f; // 十六进制 31
```

使用八进制和十六进制格式创建的数值在所有数学操作中都被视为十进制数值

#### 浮点值

对于非常大或非常小的数值，浮点值可以用科学记数法来表示。科学记数法用于表示一个应该乘以
10 的给定次幂的数值。ECMAScript 中科学记数法的格式要求是一个数值（整数或浮点数）后跟一个大
写或小写的字母 e，再加上一个要乘的 10 的多少次幂。比如：
> let floatNum = 3.125e7; // 等于 31250000

#### 值的范围

最小数值 `Number.MIN_VALUE` <br />
表示的最大数值 `Number.MAX_VALUE` <br />
如果某个计算得到的数值结果超出了 JavaScript 可以表示的范围，那么这个数值会被自动转换为一个特殊的 Infinity（无
穷）值。任何无法表示的负数以-Infinity（负无穷大）表示，任何无法表示的正数以 Infinity（正
无穷大）表示。

如果计算返回正 Infinity 或负 Infinity，则该值将不能再进一步用于任何计算。这是因为
Infinity 没有可用于计算的数值表示形式。要确定一个值是不是有限大（即介于 JavaScript 能表示的
最小值和最大值之间），可以使用 isFinite()函数，如下所示：

```
let result = Number.MAX_VALUE + Number.MAX_VALUE; 
console.log(isFinite(result)); // false
```

#### NaN

有一个特殊的数值叫 NaN，意思是“不是数值”（Not a Number），用于表示本来要返回数值的操作
失败了（而不是抛出错误）。比如，用 0 除任意数值在其他语言中通常都会导致错误，从而中止代码执
行。但在 ECMAScript 中，0、+0 或0 相除会返回 NaN：

```
console.log(0/0); // NaN 
console.log(-0/+0); // NaN 

// 如果分子是非 0 值，分母是有符号 0 或无符号 0，则会返回 Infinity 或-Infinity：
console.log(5/0); // Infinity 
console.log(5/-0); // -Infinity
```

### <div id="string">String 类型</div>

+ toString()

几乎所有值都有的 toString()方法

```angular2html
let age = 11;
let ageAsString = age.toString(); // 字符串"11"
let found = true;
let foundAsString = found.toString(); // 字符串"true"
```

toString()方法可见于数值、布尔值、对象和字符串值。（没错，字符串值也有 toString()方法，
该方法只是简单地返回自身的一个副本。）null 和 undefined 值没有 toString()方法。

通过传入参数，可以得到数值的二进制、八进制、十六进制，或者其他任何有效基
数的字符串表示，比如：

```
console.log(num.toString()); // "10" 
console.log(num.toString(2)); // "1010" 
console.log(num.toString(8)); // "12" 
console.log(num.toString(10)); // "10"  
console.log(num.toString(16)); // "a"
```

如果你不确定一个值是不是 null 或 undefined，可以使用 String()转型函数，它始终会返回表
示相应类型值的字符串。String()函数遵循如下规则。 <br />

+ 如果值有 toString()方法，则调用该方法（不传参数）并返回结果。
+ 如果值是 null，返回"null"。
+ 如果值是 undefined，返回"undefined"。

```
  let value1 = 10;
  let value2 = true;
  let value3 = null;
  let value4;
  console.log(String(value1)); // "10"
  console.log(String(value2)); // "true"
  console.log(String(value3)); // "null"
  console.log(String(value4)); // "undefined"
```
  