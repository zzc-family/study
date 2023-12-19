/**
 * console.log(decimalToBinary(233)); // 11101001
 * console.log(decimalToBinary(10)); // 1010
 */
// 1. 方法一
function decimalToBinary(num, result = "") {
    const _remain = Math.floor(num / 2);
    const _result = num % 2;
    console.log(_remain, "remain", result)
    if (_remain === 0) {
        return _result + "" + result;

    }
    return decimalToBinary(_remain, _result + "" + result)
}

// console.log(decimalToBinary(233)); // 11101001
// console.log(decimalToBinary(10)); // 1010

// 方法二
class Stack {
    constructor() {
        this.items = {};
        this.count = 0;
    }

    push(element) {
        this.count++;
        this.items[this.count] = element;
    }

    pop() {
        if (this.isEmpty()) return undefined;
        const result = this.items[this.count];
        delete this.items[this.count];
        this.count--;
        return result;
    }

    isEmpty() {
        return this.count === 0;
    }

    size() {
        return this.count
    }

    toString() {
        let num = this.count;
        let result = "";
        while (num > 0) {
            result = result + this.items[num];
            num--;
        }
        return result;
    }
}

function decimalToBinary2(num) {
    let remain = Math.floor(num / 2);
    let result = num % 2;
    const stack = new Stack();

    while (remain > 0) {
        const _remain = remain;

        remain = Math.floor(_remain / 2);
        stack.push(_remain % 2)
    }
    while (!stack.isEmpty()) {
        result += stack.pop().toString();
    }
    return result;
}


console.log(decimalToBinary2(233));
// console.log(decimalToBinary(233)); // 11101001
// console.log(decimalToBinary(10)); // 1010