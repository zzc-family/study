## Promise 的工具方法
### `Promise.resolve`
1. 可接受 thenable 对象，如果 thenable 对象是已拒绝状态，来自 Promise.resolve 的 Promise 也可能变为已拒绝状态
2. 如果传递的是一个值或者是一个 thenable 对象(已成功状态)，来自 Promise.resolve 的 Promise 将变为变为已成功状态

### `Promise.reject`
将以传递给他的拒绝理由创建一个已拒绝状态的`Promise`
```
.then(value => {
    if(value === null){
        Promise.reject(new Error())
    }
    return value;
})
```

### `Promise.all`
`Promise.all`接受一个可迭代对象[比如数组]并且会等待其中的每一个 thenable 对象变为已敲定状态，然后返回一个Promise，这存在2种情况
+ 当可迭代对象种的所有 thenable 对象都变为已成功状态时，该 Promise 也变为已成功状态。<br />当它变为已成功状态时，成功值是一个数组，该数组的值按照可迭代对象种元素调用的顺序，由原可迭代对象中的 thenable 对象的成功值和任何非 thenable 对象的值组成 <br />
 当它变为已拒绝状态时，他使用 thenable 对象的拒绝理由(使用的是第一个变为已拒绝状态的 thenable 对象的理由)
 
### `Promise.race`
接受一个可迭代对象(通常是 thenable 对象)并观察它们竞速，为竞速的结果提供一个Promise。返回的 Promise 使用“获胜的”Promise的成功值或者拒绝理由

但是所有的竞速对象都会执行

### `Promise.allSettled`
将所有可迭代对象的值传递给 Promise.resolve 方法。不管可迭代对象最后是已成功状态还是已拒绝状态，Promise.allSettled 会等待它们全部变为已敲定状态，然后返回一个对象数组，这些对象具有 status 属性和 value 或 reason 属性。 <br />

如果 status 属性为 fulfilled，那么该Promise是已成功状态，并且对象的 value 属性为成功值。如果 status 属性为 rejected，那么 Promise 是已拒绝状态，并且 reason 属性为拒绝理由

```
Promise.allSettled([Promise.resolve("v"), Promise.reject(new Error("e"))])
.then(results => {
    console.log(results)
})
/*
    [
        { status: "fulfilled", value: "v"},
        { status: "rejected", reason: Error("e") }
    ]

*/
```

### `Promise.any`
接受一个可迭代对象，传递给 Promise.resolve 并且返回一个 Promise。
 
 `Promise.any` 将成功定义为“任意 thenable 对象变为已成功状态”。将根据第一个 thenable 对象变为已成功状态时的成功值变为已成功状态。如果所有 thenable 对象都变为已拒绝状态，他会以 AggregateError 实例来拒绝该Promise， AggregateError 的 error 属性是一个由拒绝理由组成的数组。
