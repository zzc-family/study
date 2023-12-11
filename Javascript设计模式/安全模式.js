/**
 * 安全模式 避免实例化的时候 没有写 new 关键字报错
 * @param title
 * @param name
 * @returns {Books}
 * @constructor
 */
const Books = function (title, name) {
  if (this instanceof Books) {
    this.title = title;
    this.name = name;
  } else {
    return new Books(title, name);
  }
};

/*
 new 关键字 =》 可以看做对当前对象的 this
*/

const books = Books("js", "代码");
console.log(books.title);
console.log(books.name);
console.log(window.title);
console.log(window.name);
