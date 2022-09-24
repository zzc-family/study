/*
原始数据类型
* */

let num: number = 3;
let b: undefined = undefined;
let c: null = null;
let a: symbol = Symbol();
let str: string = "123";
let isLoading: boolean = true;

// 数组类型
let numbers: number[] = [1, 2, 3];
let nums: Array<number> = [1, 2, 3];
let numberArr: (string | number)[] = [1, 2, "3", 4]; // 联合类型

// 类型别名
type CustomArr = (number | string)[];
let arrs: CustomArr = [1, 2, "3", 4];

// 函数
function add1(num1: number, num2: number): number {
    return num1 + num2;
}
const add2 = (num1: number, num2: number):number => {
    return num1 + num2;
};
const add3: (num1: number, num2: number) => number = (num1, num2) => {
    return num1 + num2;
};
const add4 = (num: number): void => {
    console.log(num);
};
// todo: 可选参数
const add5 = function (num1?: number, num2?: number): void {
  console.log("num1", num1, "num2", num2)
};

// 对象类型
let people: {name: string; age: number, say: () => void; } = {
    name: "zzc",
    age: 15,
    say(){}
};

// 接口
interface IProps {
    name: string
    age: number
    say: () => void
}

// TODO: 接口和类型别名的区别
/*
*  1. 共同点： 接口和类型别名都能定义对象类型
*  2. 不同点： 接口只能定义对象类型，类型别名不仅可以定义对象类型也能定义基本类型
* */

// 接口继承
interface IPoint2D {
    x: number
    y: number
}
interface IPoint3D extends IPoint2D{
    z: number
}

// 元组 - 确定有多少个数据
let originArr: [number, string] = [12, "123"];

// 字面量类型
let str2: "字面量" = "字面量";

// typeof 类型上下文 - 根据已有值 获取变量值的类型
let point = { x: 1, y: 2 };
function getPoint(points: typeof point){}
let x2: typeof point.x = 2;

// TODO: 1. class继承
class Animal {
    move(){ console.log("move") }
}
class Dog extends Animal{
    bark(){ console.log("汪") }
}
const dog = new Dog();
console.log(dog.move());
console.log(dog.bark());

// TODO: 2. class类实现继承
interface IGetProps {
    x: number
    y: number
    name: string
    say: () => void
}
class People implements IGetProps{
    x = 1;
    y = 2;
    name = "123";
    say = () => {}
}