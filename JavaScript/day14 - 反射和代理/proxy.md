## Proxy

```
const obj = {
    testing: "abc"
}
const p = new Proxy(obj, {
    get(target, name, receiver) {
        console.log(`getting property ${name}`);
        let value = Reflect.get(target, name, receiver);
        if (value && typeof value.toUpperCase === "function") {
            value = value.toUpperCase();
        }
        return value;
    }
})
console.log("Getting directly...")
console.log("Got " + obj.testing);
console.log("Getting via proxy...");
console.log(`Got ${p.testing}`);
```

### 代理的劫持函数

| 劫持函数的名称                  | 内部操作名称                | 触发时机                               |
|--------------------------|-----------------------|------------------------------------|
| apply                    | [[Call]]              | 代理作为函数被调用时（仅在代理函数时可用）              |
| construct                | [[Construct]]         | 代理被用作构造函数时（仅在代理函数时可用）              |
| defineProperty           | [[DefineOwnProperty]] | 代理上的属性被定义或者重新定义时（包括数据属性的值被设置时）     |
| deleteProperty           | [[Delete]]            | 从代理商删除属性时                          |
| get                      | [[Get]]               | 从代理上获取属性值时                         |
| getOwnPropertyDescriptor | [[GetOwnProperty]]    | 从代理上获取属性描述符时                       |
| getPrototypeOf           | [[GetPrototypeOf]]    | 获取代理的原型时                           |
| has                      | [[HasProperty]]       | 通过代理检查属性的存在时（例如，使用 in 操作符或者类似的操作符） |
| isExtensible             | [[IsExtensible]]      | 检查代理是否可扩展时（也就是说，还没有被标记为不在扩展）       |
| ownKeys                  | [[OwnPropertyKeys]]   | 获取代理自有的属性名时                        |
| preventExtensions        | [[PreventExtensions]] | 代理被标记为不在可扩展时                       |
| set                      | [[Set]]               | 设置代理上的属性值时                         |
| setPrototypeOf           | [[SetPrototypeOf]]    | 设置代理的原型时                           |