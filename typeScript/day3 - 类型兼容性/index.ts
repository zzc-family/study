// TODO: 类型兼容性
/*
*  1. 2种类型兼容性系统，结构化类型体统，标明类型化系统
*   2. ts采用的是结构化类型体统
*   3.
* */
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}
class Point2 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z?: number){
        this.x = x;
        this.y = y;
        this.z = z || 0;
    }
}
const point3: Point = new Point2(1, 2);

interface IPoint2d {
    x: number
    y: number
}
// 参数多的可以赋值参数少的
let point4: IPoint2d = new Point2(1, 2);

// TODO: 函数兼容性
// 参数多的兼容参数少的
type F1 = ( a: number ) => void;
type F2 = ( a: number, b: number ) => void;
let f1: F1 = (a) => {};
let f2: F2 = f1;


// TODO: 交叉类型
interface IPerson {
    name: string
    say(): number
}
interface Contact {
    phone: string
}
type PesonDetail = IPerson & Contact;

let obj: PesonDetail = {
    name: "Jack",
    say: () => {return 1},
    phone: "123"
};