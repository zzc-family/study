## 正则表达式位置匹配攻略

位置（锚）是相邻字符之间的位置。
内容包括：

- <a href="#position">如何匹配位置？</a>
- 位置的特性
- 几个应用实例分析

### <div id="position">如何匹配位置</div>

在 ES5 中，共有 6 个锚：
^、$、\b、\B、(?=p)、(?!p)

#### 1.1 ^ 和 $

^（脱字符）匹配开头，在多行匹配中匹配行开头。

$（美元符号）匹配结尾，在多行匹配中匹配行结尾。

比如我们把字符串的开头和结尾用 "#" 替换（位置可以替换成字符的！）：

```
var result = "hello".replace(/^|$/g, '#');
console.log(result);
// => "#hello#"
```

多行匹配模式（即有修饰符 m）时，二者是行的概念，这一点需要我们注意：

```
var result = "I\nlove\njavascript".replace(/^|$/gm, '#');
console.log(result);
/*
#I#
#love#
#javascript#
*/
```

#### \b 和 \B

\b 是单词边界，具体就是 \w 与 \W 之间的位置，也包括 \w 与 ^ 之间的位置，和 \w 与 $ 之间的位置。

比如考察文件名 "[JS] Lesson_01.mp4" 中的 \b，如下：

```
var result = "[JS] Lesson_01.mp4".replace(/\b/g, '#');
console.log(result);
// => "[#JS#] #Lesson_01#.#mp4#"
```

\B 就是 \b 的反面的意思，非单词边界。例如在字符串中所有位置中，扣掉 \b，剩下的都是 \B 的

```
var result = "[JS] Lesson_01.mp4".replace(/\B/g, '#');
console.log(result);
// => "#[J#S]# L#e#s#s#o#n#_#0#1.m#p#4"
```

#### (?=p) 和 (?!p)

(?=p)，其中 p 是一个子模式，即 p 前面的位置，或者说，该位置后面的字符要匹配 p。

比如 (?=l)，表示 "l" 字符前面的位置，例如：

```angular2html
var result = "hello".replace(/(?=l)/g, '#');
console.log(result);
// => "he#l#lo"
```

而 (?!p) 就是 (?=p) 的反面意思，比如：

```
var result = "hello".replace(/(?!l)/g, '#');
console.log(result);
// => "#h#ell#o#"
```

#### 位置的特性

对于位置的理解，我们可以理解成空字符 ""。

比如 "hello" 字符串等价于如下的形式：

`"hello" == "" + "h" + "" + "e" + "" + "l" + "" + "l" + "" + "o" + "";`

也等价于：

`"hello" == "" + "" + "hello"`

因此，把 /^hello$/ 写成 /^^hello$$$/，是没有任何问题的：

```angular2html
var result = /^^hello$$$/.test("hello");
console.log(result);
// => true
```

甚至可以写成更复杂的:

```
var result = /(?=he)^^he(?=\w)llo$\b\b$/.test("hello");
console.log(result);
// => true
```

也就是说字符之间的位置，可以写成多个。

#### 相关案例

- 不匹配任何东西的正则

  /.^/

  因为此正则要求只有一个字符，但该字符后面是开头，而这样的字符串是不存在的

- 数字的千位分隔符表示法
  比如把 "12345678"，变成 "12,345,678"。

  可见是需要把相应的位置替换成 ","。

  ```
  var string = "12345678 123456789",
  regex = /(?\B)(?=(\d{3})+\b)/g;
  var result = string.replace(regex, ',')
  console.log(result);
  // => "12,345,768 123,456,789"
  ```

- 格式化

  1888 =》 $ 1888.00

  ```
  function format (num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+\b)/g, ",").replace(/^/, "$$ ");
  };
  console.log( format(1888) );
  ```

#### 验证密码问题

密码长度 6-12 位，由数字、小写字符和大写字母组成，但必须至少包括 2 种字符

`var regex = /(?=.*[0-9])(?=.*[a-z])^[0-9A-Za-z]{6,12}$/;`

我们可以把原题变成下列几种情况之一：

- 同时包含数字和小写字母
- 同时包含数字和大写字母
- 同时包含小写字母和大写字母
- 同时包含数字、小写字母和大写字母

以上的 4 种情况是或的关系（实际上，可以不用第 4 条）。
最终答案是

```
var regex = /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[AZ]))^[0-9A-Za-z]{6,12}$/;
console.log( regex.test("1234567") ); // false 全是数字
console.log( regex.test("abcdef") ); // false 全是小写字母
console.log( regex.test("ABCDEFGH") ); // false 全是大写字母
console.log( regex.test("ab23C") ); // false 不足6位
console.log( regex.test("ABCDEF234") ); // true 大写字母和数字
console.log( regex.test("abcdEF234") ); // true 三者都有
```
