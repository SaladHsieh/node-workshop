# 認識 node.js & node.js的課堂筆記

###### tags:`NodeJS`
date: 2021/7/31~2021/8/1
## 介紹：
* 這個repo主要是我的上課筆記
* 瞭解如何安裝nvm以及node.js (Mac & Windows)
* 何為node.js以及其特點
* 如何執行node.js
* 同步與非同步 XMLHttpRequest

---

# NodeJS

> 用 JS 來寫後端

--> NodeJS 可以讓你脫離瀏覽器執行 JS

JS: 程式語言，需要搭配執行環境：
  - 瀏覽器
  - NodeJS

## 安裝node.js

### LTS

long-term support 長期維護版

- Current: 最新的 NodeJS 版本
- Active: 正在積極維護和升級的版本
- Maintenance: 維護的 LTS，直到生命週期
- EOL: end of life

### 安裝方法：

二選一，推薦先試試看 nvm

- 直接安裝 node
下載網址: https://nodejs.org/zh-tw/download/

- nvm: node version manager
    - production v14
    - 想要測試 v16

mac:
https://github.com/nvm-sh/nvm#install--update-script

```bash=
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# 確認自己用的 shell 是哪一種後，修改相對應的設定檔
$ echo $0

# 使用下面指令進入修改
$ nano ~/.bash_profile

# 輸入下列進去(會出現在install那邊可以copy)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This load$

# 修改完，存檔後，重新啟動 terminal

# 重新啟動 terminal後,輸入下列指令查詢版本號
$ nvm -v
```

windows:

==安裝路徑不能出現中文==

https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows
![](https://i.imgur.com/Ix1Tqsk.png)


```bash=
$ nodenvm -v

v0.38.0
1.1.7
```

```bash=
$ nvm ??

# 列出可以安裝的版本
$ nvm ls-remote 14
# windows版本
$ nvm list available

# 安裝最新版本號
$ nvm install 14.17.4

# 切換要使用的 node 版本
$ nvm use 14.17.4

# 確認目前執行的版本
$ node -v

# 列出你目前主機安裝的版本
$ nvm ls

# windows版本
$ nvm list 


# 設定預設的版本
$ nvm alias default 14.17.4
```

時間複雜度、空間複雜度
O(1), O(n), O(n^2),....

## NodeJS 是什麼

- NodeJS 是不是一個程式語言嗎？ No
- NodeJS 是不是一個框架？ No
- NodeJS 可以讓我們脫離瀏覽器、在伺服器端執行 JS 程式語言的一個環境

![](https://i.imgur.com/JcXqMC2.png)

JS

document 瀏覽器
window 瀏覽器
location 瀏覽器
setTimeout, setInterval 瀏覽器

NodeJS, 瀏覽器都有提供：
console.log
setTimeout, setInterval

### 已經有 PHP，為什麼還需要 nodejs?

Ryan Dahl 高性能的 web server

apache, C, Lua, Haskell 跟 Ruby...

www
Google Chrome 
Netscape Ｘ 
微軟獨占 windows 自動就裝好 IE
IE6 

Google Chrome V8 --> 效能很好的 JS 執行引擎

Firefox: SpiderMonkey
Safari: JavaScriptCore / Nitro --> new IE
Edge: Chakra，後來使用 Chromium/V8 進行了重構

Ryan JS (V8)


## node.js 特色:
- 單執行緒
- 非阻塞
- 非同步IO (==IO工作：網路傳輸、讀硬碟資料、資料庫==)
- event loop

### 單執行緒

什麼是執行緒 thread ？
  
Process 成本比較高的執行單位，content swtich 的成本比較高
(==當一個process在等的時候，他的CPU會被搶走，換成另外一個process造成content switch==)

Thread(執行緒): Process 之下，CPU 執行的最小單位 （可能會發生 race condition)

JS 是一個 single thread 的程式語言 -> 一個人在工作

PHP 相反 => multi-process

誰比較快？

demo

* PHP
-n 10000 -c 1000
Requests per second:    2242.04 [#/sec] (mean)
Time per request:       446.023 [ms] (mean)
-n 100000 -c 1000
Requests per second:    2893.70 [#/sec] (mean)
Time per request:       345.578 [ms] (mean)
-n 300000 -c 1000
Failed requests:        58
Requests per second:    2100.17 [#/sec] (mean)
Time per request:       476.152 [ms] (mean)

* Nodejs
-n 10000 -c 1000
Requests per second:    2862.02 [#/sec] (mean)
Time per request:       349.403 [ms] (mean)
-100000 -c 1000
Requests per second:    2993.87 [#/sec] (mean)
Time per request:       334.016 [ms] (mean)
-n 300000 -c 1000
Requests per second:    3582.09 [#/sec] (mean)
Time per request:       279.167 [ms] (mean)

結論：
- nodeJS=麥當勞(客人請旁邊稍等) / PHP=銀行(緊握電話)
- apache + php 會有很多個 process
- node 只有一個 process (只有一個 thread*)
- 小壓力：沒太多差別
    - apache + php 會一直開新的 process
    - node 永遠只有一個，但 CPU 一直飆高
- 大壓力:
    - apache + php => 開到太多就 crash => 有 58 個 request failed
    - node: 沒有任何 request failed，而且表現數據比小壓力還好

NodeJS vs PHP -> 依照我們上述測試，NodeJS 比較快

==所謂的性能比較，不同情境下，可能會有截然不同的結果==

php 開這麼多 process，為什麼還比較慢？ => content switch 的成本、記憶體的資源
node 單執行緒 => 先用完 CPU
  - 缺點：無法善用多核心
 
PHP 容錯能力比較強大
node single-thread 一但發生讓這個 thread 中止執行的錯誤時，可能整個 server 就掰掰了

視需求 php + nodejs 也可能共用

==php 與 nodejs 不同==
php開多個process
node.js一個process多個thread {node}(XXXXX)表示一個thread
![](https://i.imgur.com/66ieD8J.png)



鄙視鏈 C++ > JAVA > C# > .... > PHP

「PHP 很爛」--> 通常是寫的人很爛
![](https://i.imgur.com/azCAxXO.png)

content switch

FIFO (First In  First Out)
SJF (Shortest Time Job First)

> [color=#FFBB66] 架構是演進的，既要考慮未來擴充彈性、又要避免 over-design
happy problem
重構你的架構跟程式碼 

#### 問題：以下哪一個應用的效能比較好？
應用 A: 單一請求時，執行時間為 10ms，同時間一萬個請求時，單一請求執行時間為 100 s。
應用 B: 單一請求時，執行時間為 100ms，同時間一萬個請求時，單一請求執行時間為 200 ms。

> [color=#FFBB66] 
> 需要視情況而定，單一請求速度快 vs 可以同時撐住多個請求
>  <br>


架構、部署架構


[JS 內建物件](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects)

### Event-loop

![](https://i.imgur.com/QtirgaE.png)

**stack: Data Structure 的一種，Last In First Out (LIFO) 或 Fisrt In Last Out (FILO)**

Last In First Out (LIFO): 後進先出
Fisrt In Last Out (FILO): 先進後出

頭         尾
[1, 2, 3, 4]

把東西放進 stack 的尾巴 ==> push
把東西從 stack 的尾巴拿出來 ==> pop

拿出        放進去
shift <---> unshift

JS 的 array function 是已經幫你實作了 Stack / Queue

![](https://i.imgur.com/NKfkO7P.jpg)

**Queue -> 佇列 排隊**
First In First Out (FIFO): 先進先出
![](https://i.imgur.com/wAaMIiP.jpg)




==node.js才有webAPI、queue、event loop==
==php只有stack==
![](https://i.imgur.com/CDkxhLn.png)
**js**
![](https://i.imgur.com/yXHU74r.png)
**node.js**
![](https://i.imgur.com/10XuJdB.png)


## XMLHttpRequest

XML Http Request

瀏覽器提供的

json => JavaScript Object Notation 
=> 把 json 當成資料格式來用
```json=
{
    "name": "ashley",
    "country": "Taiwan",
    "email": "ashleylai58@gmail.com",
    "github": "https://github.com/azole/node-workshop",
}
```

json 為什麼會大幅取代 xml?
- json 本來就是一個 object, js 原生可以就可以處理，PHP 也都可以。
- json 比較小(不論資料，就論欄位名稱，XML 會是兩倍)

xml 是另外一種資料格式 (傳輸用的資料格式)
```xml=
<person>
    <name>ashley</name>
    <country>Taiwan</country>
    <email>ashleylai58@gmail.com</email>
    <github>https://github.com/azole/node-workshop</github>
</person>
```

- HTTP request  HTTP請求
- HTTP response HTTP回覆

JQuery $.get $.post, $.ajax


