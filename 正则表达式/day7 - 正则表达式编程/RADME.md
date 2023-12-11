- <a href="#first">正则表达式的四种操作</a>
- <a href="#second">相关API注意要点</a>
- <a href="#third">真实案例</a>

### <div id="first">正则表达式的四种操作</div>

#### 1、验证

有没有匹配，是不是匹配上，判断是否的操作，即称为“验证”。

比如，判断一个字符串中是否有数字。

使用`search`

```javascript
var regex = /\d/;
var string = "abc123";
console.log(!!~string.search(regex));
// => true
```

使用`test`

```javascript
var regex = /\d/;
var string = "abc123";
console.log(regex.test(string));
// => true
```

使用`match`

```javascript
var regex = /\d/;
var string = "abc123";
console.log(!!string.match(regex));
// => true
```

使用 `exec`

```javascript
var regex = /\d/;
var string = "abc123";
console.log(!!regex.exec(string));
// => true
```

#### 2、切分

所谓“切分”，就是把目标字符串，切成一段一段的。在 JavaScript 中使用的是 split。

比如，目标字符串是 "html,css,javascript"，按逗号来切分：

```javascript
var regex = /,/;
var string = "html,css,javascript";
console.log(string.split(regex));
// => ["html", "css", "javascript"]
```

又比如，如下的日期格式：

```javascript
// 2017/06/26
// 2017.06.26
// 2017-06-26

var regex = /\D/;
console.log("2017/06/26".split(regex));
console.log("2017.06.26".split(regex));
console.log("2017-06-26".split(regex));
// => ["2017", "06", "26"]
// => ["2017", "06", "26"]
// => ["2017", "06", "26"]
```

#### 3、提取

虽然整体匹配上了，但有时需要提取部分匹配的数据。

此时正则通常要使用分组引用（分组捕获）功能，还需要配合使用相关 API。

这里，还是以日期为例，提取出年月日。注意下面正则中的括号：

使用 match

```javascript
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
console.log(string.match(regex));
// =>["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26"]
```

使用 `exec`

```javascript
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
regex.test(string);
console.log(RegExp.$1, RegExp.$2, RegExp.$3);
// => "2017" "06" "26"
```

使用 `search`

```javascript
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
string.search(regex);
console.log(RegExp.$1, RegExp.$2, RegExp.$3);
// => "2017" "06" "26"
```

使用 `replace`

```javascript
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
var date = [];
string.replace(regex, function (match, year, month, day) {
  date.push(year, month, day);
});
console.log(date);
// => ["2017", "06", "26"]
```

#### 4、替换

比如把日期格式，从 yyyy-mm-dd 替换成 yyyy/mm/dd：

```javascript
var string = "2017-06-26";
var today = new Date(string.replace(/-/g, "/"));
console.log(today);
// => Mon Jun 26 2017 00:00:00 GMT+0800 (中国标准时间)
```

### <div id="second">二、相关 API 注意要点</div>

#### 2.1 search 和 match 的参数问题

我们知道字符串实例的那 4 个方法参数都支持正则和字符串。
但 search 和 match，会把字符串转换为正则的

```javascript
var string = "2017.06.27";
console.log(string.search("."));
// => 0
//需要修改成下列形式之一
console.log(string.search("\\."));
console.log(string.search(/\./));
// => 4
// => 4
console.log(string.match("."));
// => ["2", index: 0, input: "2017.06.27"]
//需要修改成下列形式之一
console.log(string.match("\\."));
console.log(string.match(/\./));
// => [".", index: 4, input: "2017.06.27"]
// => [".", index: 4, input: "2017.06.27"]
console.log(string.split("."));
// => ["2017", "06", "27"]
console.log(string.replace(".", "/"));
// => "2017/06.27"
```

#### 2.2 `match`返回格式问题

`match` 返回结果的格式，与正则对象是否有修饰符 g 有关

```javascript
var string = "2017.06.27";
var regex1 = /\b(\d+)\b/;
var regex2 = /\b(\d+)\b/g;
console.log(string.match(regex1));
console.log(string.match(regex2));
// => ["2017", "2017", index: 0, input: "2017.06.27"]
// => ["2017", "06", "27"]
```

没有 g，返回的是标准匹配格式，即，数组的第一个元素是整体匹配的内容，接下来是分组捕获的内容，然
后是整体匹配的第一个下标，最后是输入的目标字符串。

有 g，返回的是所有匹配的内容。

当没有匹配时，不管有无 g，都返回 null

#### `exec` 比 `match` 更强大

从下面可以看出用于正则操作的方法，共有 6 个，字符串实例 4 个，正则实例 2 个

```
String#search
String#split
String#match
String#replace
RegExp#test
RegExp#exec
```
