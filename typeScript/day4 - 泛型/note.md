### 泛型
####创建泛型函数
```
function id<Type>(value: Type): Type { return value }
const num = id(10); // 类型参数推断
const str = id<string>("a");
```
 1. 在函数名称的后面加上`<>`,尖括号种添加类型变量，比如此处的`Type`
 2. `类型变量Type`, 是一种特殊类型的变量，他处理类型而不是值
 3. 该类型变量相当于一个类型容器，能够捕获用户提供的类型(具体是什么类型由用户调用该函数时指定)
 4. 因为`Type`是类型，因此可以将其作为函数参数和返回值的类型，便是参数和返回值具有相同的类型
 5. 类型变量`Type`，可以是任意合法的变量名称
 ---
 #### 添加约束
 ```
interface ILength { length: number }
function id<Type extends ILength>(value: Type): Type {
    console.log(value.length);
    return value;
}
```
1. 创建描述约束的接口 `ILength` ,该接口要求提供`length`属性
2. 通过`extends`关键字使用该接口，为泛型(类型变量)添加约束
3. 该约束表示：传入的类型必须具有length属性
---
### 泛型接口
接口也可以配合泛型来使用，以增加其灵活性，增加其复用性
```
interface IdFunc<Type> {
    id: (value: Type) => Type
    ids: () => Type[]
}
let obj: IdFunc<number> = {
    id(value){ return value },
    ids(){ return [1, 3, 5] }
}
```
1. 在接口名称的后面添加`<类型变量>`, 那么，这个接口就变成了泛型接口
2. 接口的类型变量，对接口中所有其他成员可见，也就是接口中所有成员都可以使用类型变量
3. 使用泛型接口时，需要显示指定具体的类型(比如，此处的`idFunc<number>`)
4. 此时，`id`方法的参数和返回值类型都是`number`;`ids`方法的返回值类型是`number[]`

--- 
### 泛型工具类型
#### `Partial` - 用来构造(创建)一个类型，将`Type`的所有属性设置为可选
```
interface Props {
    id: string
    children: number[]
}
type PartialProps = Partical<Props>;
```
构造出来的新类型`PartialProps`结构和`Props`相同，但所有属性都变为可选的
#### `Readonly<Type>` - 用来构造一个类型，将`Type`的所有属性都设置为`readonly`(可读)
```
type ReadonlyProps = Readonly<Props>
```
#### `Pick<Type, Keys>`从`Type`中选择一组属性来构造新类型
```
interface Props { 
    id: string
    title: string
    children: number[]
}
type PickProps = Pick<Props, 'id' | 'title'>
```
1. `Pick`工具类型有2个类型变量： 1表示选择谁的属性 2表示选择那几个属性
2. 其中第二个类型变量，如果只选择一个则只传入该属性名即可
3. 第二个变量类型传入的属性只能是第一个类型变量中存在的属性
4. 构造出来的新类型`PickProps`, 只有`id`和`title`两个属性类型
#### `Record<Keys, Type>`构造一个对象类型，属性键为`Keys`，属性类型位Type
```
type RecordObj = Record<"a" | "b" | "c", string[]>
let obj: RecordObj = {
    a: ["1"],
    b: ["2"],
    c: ["3"]
}
```
1. `Record`工具类型有2个类型变量：1表示对象有哪些属性 2表示对象属性的类型
2. 构造的新对象类型`RecordObj`表示： 这个对象有3个属性分别为`a`,`b`,`c`, 属性值的类型都是`string[]`