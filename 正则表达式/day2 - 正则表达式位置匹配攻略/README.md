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
