## GIT

### 删除添加到暂存区的文件

> git rm --cached hello.ts

### 本地仓库版本回退

> git reflog // 查看简要版本号
> git log // 查看详细版本号
> :wq 版本号

### 移动文件

git mv note.md README.md

### 查看提交历史

git log
git log -p -2 //只输出最近的 2 次提交 <br />
git log -p // 显示出每次提交所引入的差异 <br />
git log --stat //查看每个提交的简要统计信息 <br />
git log --pretty=oneline // 更改日志输出格式 一行显示 commitID commitMsg <br />
git log --pretty=short <br />
git log --pretty=full <br />
git log --pretty=fuller <br />

// 自定义格式
git log --pretty=format:"%h - %an, %ar : %s"

| 格式选项 | 输出的格式描述           |
| -------- | ------------------------ |
| %H       | 提交对象的散列值         |
| %h       | 提交对象的简单散列值     |
| %T       | 树对象的散列值           |
| %t       | 提交对象的简单散列值     |
| %P       | 父对象的散列值           |
| %p       | 父对象的简单散列值       |
| %an      | 作者的名字               |
| %ae      | 作者的电子邮箱地址       |
| %ad      | 创作日期                 |
| %ar      | 相对于当前日期的创作日期 |
| %cn      | 提交者的名字             |
| %ce      | 提交者的电子邮箱地址     |
| %cd      | 提交日期                 |
| %cr      | 相对于当前日期的提交日期 |
| %s       | 提交信息的主题           |

git log --graph // 显示git分支和合并历史

限制提交历史的输出范围 略
git log常用选项 略 
《精通git》第二版 P29