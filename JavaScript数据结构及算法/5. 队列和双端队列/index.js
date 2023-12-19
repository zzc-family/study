class Quene {
	constructor() {
		this.count = 0; //控制队列的大小
		this.lowestCount = 0; // 追踪第一个元素
		this.items = {};
	}


	// 返回队列包含的元素个数 与数组的length属性类似
	size() {
		return this.count;
	}

	isEmpty() {
		return this.count === 0;
	}

	// 向队列尾部添加一个或者多个新的项
	enqueue(element) {
		this.count++;
		this.items[this.count] = element;
	}

	// 最新添加的项也是最先被移除的
	dequeue() {

	}

}