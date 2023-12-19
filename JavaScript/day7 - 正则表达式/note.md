## 正则表达式

### 限定符

1. <a href="#question">?</a>
2. <a href="#+">\+</a>
3. <a href="#*">\*</a>

### <div id="question">?</div>

```
/uad?

可以匹配 ua 或者 uad
? 前面的字符可有可无
```

### <div id="*">*</div>

```
/ab*c

可以匹配 ac、abc、abbbbc
* 前面的字符可有可无 可匹配多次 
```

### +

可以匹配1次以上的字符

```
ab+c
// abc 没有匹配
// abbc 匹配
// abbbc 匹配

ab+{2,5}c 匹配b出现2到5次
ab+{2,}c 匹配到出现2次以上
```