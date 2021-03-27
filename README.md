# Clrcon

使用 Node.js 清除指定目录下所有文件中的 `console.log()`，使用前请先看[注意事项](#注意事项)

## 安装

当前项目

```shell script
yarn add clrcon 
# or npm install clrcon
```

全局安装

```shell script
yarn global add clrcon
# or npm install -g clrcon
```

## 在项目中使用

首先要在 package.json 中添加如下脚本

```json
{
  "scripts": {
    "clr": "clrcon"
  }
}
```

运行（默认只会清除当前项目 src 目录下文件）

```shell script
yarn clr
# or npm run clr
```

也可以指定多个目录

```shell script
yarn clr -a public src dist
```

## 全局使用

如果是全局安装，直接运行以下命令即可

```shell script
# 清除 src 目录
clrcon
# 清除多个指定目录
clrcon -a public src dist
```

## 依赖

- **Node.js** v12.20.0
- **commander** v7.2.0

## 注意事项

该脚本无法清除以下案例的代码

```js
// 1. 把 "console.log(" 做为字符串使用，会导致整个文件内容误删
const a = 'console.log('

// 2. 在 console 中添加 ")"，会跳过该行 console
console.log(')')
console.log('(' + ')')
console.log('(')

// 3. 在 console 中添加以下字符串，可能会导致该行后内容误删
console.log('console.log(')
```

以上案例还包括双引号字符串("")、以及模板字符串(\`\`)