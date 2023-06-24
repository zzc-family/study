// 创建一个类表示栈
class Stack {
    constructor() {
        this.items = [];
    }

    /**
     * 添加一个或者几个新元素到栈顶
     * @param element
     */
    push(element) {
        this.items.push(element);
    }
    // 移除栈顶的元素 同时返回被移除的元素
    pop(){
        return this.items.pop();
    }
    // 如果栈里没有元素返回true 否者 false
    isEmpty(){
        return this.size() === 0;
    }
    size(){
        return this.items.length;
    }
    // 清空栈里所有的元素
    clear(){
        this.items = [];
    }
    // 返回栈顶的元素 不对栈做任何修改（该方法不会移除栈底的元素 仅仅返回他）
    peek(){
        if(this.size() > 0) return this.items[this.items.length - 1];
        return undefined;
    }
}


// 基于对象实现 - 数组是元素的一个有序集合 会占用更多的内存空间
class StackObj {
    constructor() {
        this.count = 0;
        this.items = {};
    }
    push(element){
        this.count++;
        this.items[this.count] = element;
    }
    // 移除栈顶的元素 同时返回被移除的元素
    pop(){
        if(this.isEmpty()) return undefined;
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    // 如果栈里没有元素返回true 否者 false
    isEmpty(){
        return this.size() === 0;
    }
    size(){
        return this.count;
    }
    // 清空栈里所有的元素
    clear(){
        this.count = 0;
        this.items = {};
    }
    // 返回栈顶的元素 不对栈做任何修改（该方法不会移除栈底的元素 仅仅返回他）
    peek(){
       if(this.isEmpty()) return undefined;
       return this.items[this.count - 1];
    }
    toString(){
        let result = "";
        for(let i = 1; i <= this.count; i++){
            result = result ? result + `,${this.items[i]}` : this.items[i];
        }
        return result;
    }
}

const obj = new StackObj();

console.log(obj.toString())