---
title: "正则表达式完全指南"
date: 2025-12-15
weight: 9
description: "从基础到进阶，掌握正则表达式的强大功能，提升文本处理能力"
tags: ["正则表达式", "文本处理", "编程技能"]
categories: ["技术教程"]
---

## 什么是正则表达式？

正则表达式（Regular Expression，简称 Regex）是一种用于匹配字符串的强大工具。它使用特定的语法来描述字符串的模式，可以用于搜索、替换、验证等操作。

## 基础语法

### 字符类

```regex
.       匹配任意单个字符（除了换行符）
\d      匹配数字 [0-9]
\D      匹配非数字
\w      匹配字母、数字、下划线 [a-zA-Z0-9_]
\W      匹配非字母、数字、下划线
\s      匹配空白字符（空格、制表符、换行符等）
\S      匹配非空白字符
[abc]   匹配 a、b 或 c
[a-z]   匹配 a 到 z 的任意字符
[^abc]  匹配除了 a、b、c 之外的任意字符
```

### 量词

```regex
*       匹配 0 次或多次
+       匹配 1 次或多次
?       匹配 0 次或 1 次
{n}     匹配恰好 n 次
{n,}    匹配至少 n 次
{n,m}   匹配 n 到 m 次
```

### 锚点

```regex
^       匹配字符串的开始
$       匹配字符串的结束
\b      匹配单词边界
\B      匹配非单词边界
```

### 分组和引用

```regex
(abc)       分组，捕获 abc
(?:abc)     非捕获分组
(a|b)       匹配 a 或 b
\1          引用第一个捕获组
```

## 常见模式

### 验证电子邮件
```regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

### 验证电话号码（中国）
```regex
^1[3-9]\d{9}$
```

### 验证 URL
```regex
^https?://[^\s/$.?#].[^\s]*$
```

### 验证 IP 地址
```regex
^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$
```

### 验证身份证号（简化版）
```regex
^\d{17}[\dXx]$
```

### 匹配 HTML 标签
```regex
<([a-z]+)([^>]*)>(.*?)</\1>
```

## JavaScript 中的正则表达式

### 创建正则表达式
```javascript
// 字面量方式
const regex1 = /hello/i;

// 构造函数方式
const regex2 = new RegExp('hello', 'i');
```

### 常用方法

#### test() - 测试是否匹配
```javascript
const regex = /hello/i;
console.log(regex.test('Hello World'));  // true
console.log(regex.test('Goodbye'));      // false
```

#### exec() - 执行匹配
```javascript
const regex = /(\d+)-(\d+)-(\d+)/;
const result = regex.exec('2025-12-15');
console.log(result[0]);  // "2025-12-15"
console.log(result[1]);  // "2025"
console.log(result[2]);  // "12"
console.log(result[3]);  // "15"
```

#### match() - 字符串方法
```javascript
const str = 'The year is 2025';
const matches = str.match(/\d+/g);
console.log(matches);  // ["2025"]
```

#### replace() - 替换
```javascript
const str = 'Hello World';
const result = str.replace(/world/i, 'JavaScript');
console.log(result);  // "Hello JavaScript"

// 使用捕获组
const date = '2025-12-15';
const formatted = date.replace(/(\d+)-(\d+)-(\d+)/, '$3/$2/$1');
console.log(formatted);  // "15/12/2025"
```

#### split() - 分割
```javascript
const str = 'apple,banana;orange:grape';
const fruits = str.split(/[,;:]/);
console.log(fruits);  // ["apple", "banana", "orange", "grape"]
```

#### search() - 查找位置
```javascript
const str = 'Hello World';
const index = str.search(/world/i);
console.log(index);  // 6
```

## 高级用法

### 前向断言和后向断言
```regex
(?=pattern)   正向前向断言 - 匹配后面跟着 pattern 的位置
(?!pattern)   负向前向断言 - 匹配后面不跟着 pattern 的位置
(?<=pattern)  正向后向断言 - 匹配前面跟着 pattern 的位置
(?<!pattern)  负向后向断言 - 匹配前面不跟着 pattern 的位置
```

### 示例
```javascript
// 匹配不是 .jpg 的文件名
const regex = /\w+(?!\.jpg)$/i;

// 匹配价格（前面有 $ 符号）
const regex = /(?<=\$)\d+(\.\d{2})?/;

// 在 JavaScript 中使用
const str = '$100 and $50.99';
const prices = str.match(/(?<=\$)\d+(\.\d{2})?/g);
console.log(prices);  // ["100", "50.99"]
```

### 贪心和非贪心匹配
```javascript
const str = '<div>Hello</div><div>World</div>';

// 贪心匹配（默认）
const greedy = str.match(/<div>.*<\/div>/);
console.log(greedy[0]);  // "<div>Hello</div><div>World</div>"

// 非贪心匹配
const nonGreedy = str.match(/<div>.*?<\/div>/g);
console.log(nonGreedy);  // ["<div>Hello</div>", "<div>World</div>"]
```

## 实用示例

### 验证密码强度
```javascript
function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

console.log(validatePassword('Weak123'));        // false
console.log(validatePassword('Strong@123'));    // true
```

### 提取 URL 参数
```javascript
function getUrlParams(url) {
  const params = {};
  const regex = /[?&]([^=]+)=([^&]*)/g;
  let match;
  
  while ((match = regex.exec(url)) !== null) {
    params[match[1]] = decodeURIComponent(match[2]);
  }
  
  return params;
}

const url = 'https://example.com?name=John&age=30';
console.log(getUrlParams(url));  // { name: 'John', age: '30' }
```

### 驼峰转下划线
```javascript
function camelToSnake(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

console.log(camelToSnake('getUserName'));  // "get_user_name"
```

### 下划线转驼峰
```javascript
function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

console.log(snakeToCamel('get_user_name'));  // "getUserName"
```

### 移除 HTML 标签
```javascript
function stripHtmlTags(html) {
  return html.replace(/<[^>]*>/g, '');
}

console.log(stripHtmlTags('<p>Hello <b>World</b></p>'));  // "Hello World"
```

## 正则表达式标志

```javascript
g   全局匹配（找到所有匹配项）
i   不区分大小写
m   多行匹配
s   使 . 匹配换行符
u   Unicode 模式
y   粘性匹配
```

## 性能优化建议

1. **避免过度回溯** - 使用具体的模式而不是过于宽泛的模式
2. **使用非捕获分组** - 如果不需要捕获，使用 `(?:...)` 而不是 `(...)`
3. **避免嵌套量词** - 如 `(a+)+` 可能导致性能问题
4. **使用字符类而不是交替** - `[abc]` 比 `(a|b|c)` 更快
5. **预编译正则表达式** - 避免在循环中重复创建正则表达式

## 常见错误

```javascript
// 错误：忘记转义特殊字符
const regex = /\./;  // 匹配任意字符，不是点号

// 正确：转义点号
const regex = /\./;  // 匹配点号

// 错误：在字符类中不需要转义某些字符
const regex = /[\d\-]/;  // 在字符类中，- 应该在开头或结尾

// 正确
const regex = /[\d-]/;  // 或 /[-\d]/
```

## 在线工具

- **Regex101** - https://regex101.com
- **RegexPal** - https://www.regexpal.com
- **Regex Tester** - https://www.regextester.com

## 总结

正则表达式是文本处理的强大工具。虽然学习曲线陡峭，但掌握它能大大提高开发效率。记住，实践是学习正则表达式的最好方法。
