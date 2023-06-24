## Set

### 基本操作

1. 创建

> const s = new Set();

2. 添加

> s.add("two");
> s.add("two").add("three");

3. 检查Set中是否包含一个值

> s.has("two");

4. 条目数

> s.size;

5. 删除

> s.delete("two");

6. 清空

> s.clear()

### 迭代Set的内容

```
const s = new Set(["a", "b", "c"]);

for(const value of s){
    console.log(value)
}

for(const key of s.keys()){
    console.log(key);
}

for(const [key, value] of s.entries()){
    console.log(key, value);
}
```