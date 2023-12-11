## 建造者模式

```javascript
// 创建一位人类
const Human = function (param) {
  // 技能
  this.skill = (param && param.skill) || "保密";
  // 爱好
  this.hobby = (param && param.hobby) || "保密";
};

// 人类原型方法
Human.prototype = {
  getSkill: function () {
    return this.skill;
  },
  getHobby: function () {
    return this.hobby;
  },
};

// 实例化姓名类
const Named = function (name) {
  const that = this;
  // 构造器
  // 构造函数解析姓名的姓与名
  (function (name, that) {
    that.wholeName = name;
    if (name.indexOf(" ") > -1) {
      that.FirstName = name.slice(0, name.indexOf(" "));
      that.secondName = name.slice(name.indexOf(" "));
    }
  })(name, that);
};

// 实例化职位类
const Work = function (work) {
  const that = this;
  // 构造器
  // 构造函数中通过传入的职位特征来设置相应职位以及描述
  (function (work, that) {
    switch (work) {
      case "code":
        that.work = "工程师";
        that.workDescript = "每天沉醉于编程";
        break;
      case "UI":
      case "UE":
        that.work = "设计师";
        that.workDescript = "设计更似一种艺术";
        break;
      case "teach":
        that.work = "教师";
        that.workDescript = "分享也是一种快乐";
        break;
      default:
        that.work = work;
        that.workDescript = "对不起，我们还不清楚您所选择职位的相关描述";
    }
  });
};

// 更换期望的职位
Work.prototype.changeWork = function (work) {
  this.work = work;
};

// 添加对职位的描述
Work.prototype.changeDescript = function (setence) {
  this.workDescript = setence;
};

const Person = function (name, work) {
  // 创建应聘者缓存对象
  const _person = new Human();
  // 创建应聘者姓名解析对象
  _person.name = new Named(name);
  // 创建应聘者期望职位
  _person.work = new Work(work);
  // 将创建的应聘者对象返回
  return _person;
};

// 测试
const person = new Person("xiao ming", "code");
console.log(person.skill); // 保密
console.log(person.name.FirstName); // xiao
console.log(person.work.work); // 工程师
console.log(person.work.workDescript); // 每一天在编程中度过
person.work.changeDescript("更改一下职位描述!");
console.log(person.work.workDescript); // 更改一下职位描述!
```
