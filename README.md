# 認識 node.js & node.js的課堂筆記

###### tags:`NodeJS`
date: 2021/7/31~2021/8/1
## 介紹：
* 這個repo主要是我的上課筆記
* 瞭解如何安裝nvm以及node.js (Mac & Windows)
* 何為node.js以及其特點
* 如何執行node.js
* 同步與非同步 XMLHttpRequest

老師: Ashley (小賴)
ashleylai58@gmail.com

共筆: https://hackmd.io/GRRTV8KwSwe_iZfTatZVeQ

作業: https://docs.google.com/spreadsheets/d/1A-SYD-nQ0hME5VCdPImmWoz4SlZu7Gh0mMIPMEvCADE/edit?usp=sharing

錄影檔: https://drive.google.com/drive/folders/1wz1LctMmE4IlXWii6730f9RVkaGZj5fz?usp=sharing

第一週問卷調查: https://forms.gle/TzvZbedcDiNDvXPN9
8/1 測驗: https://forms.gle/MmvtoSF653suRiFH7

---
 
## 前後端相關知識學習


- 工具類： Git, Webpack...等
- 作業系統 Operating system
     Windows, Linux, MacOS,...
- 資料結構 Data Structure
    - 程式中各種資料的結構
- 演算法 Algorithm
    - 怎麼解決一個問題
- 網路 Networking
    - HTTP, TCP/UDP, 網路七層
- 設計模式 Design Pattern
- 資料庫管理 Database Management
    - JOIN 有沒有效率？
    - key -> tree (DS, Algo)
- 測試、部署維運、CI/CD
- 雲端服務: AWS, GCP, Azure

Coursera, udemy, codecademy, leetcode

js, php -> DS, Algo

暴力法

---
## 作業系統
![](https://i.imgur.com/TPLkYGR.png)


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

==作業==
1. 到 github 建立 node-workshop 專案

2. clone 下來
![](https://i.imgur.com/I0xq61D.png)
```bash=
$ git clone {url}
```

3. 在專案裡建立 basic 檔案夾
```bash=
$ mkdir basic
```
4. 在 basic 檔案夾中建立 sum.js 檔案
5. 編寫 sum.js & 測試
   - 在 terminal 切換到正確的路徑
   - 執行的方法： `node sum.js`
6. push 到 github 上
7. 去作業表打勾

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


## node.js 特色:（面試必考題)
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


---

## [ JS 觀念(上)](https://reurl.cc/7rAGbd)
**Scope 作用域**
>[color=#99BBFF] where a function , procedure , variable or constant can be used
>
>JS have two lexical scopes global and function:
> - global scope 全域變數
> - function scope 區域變數
> 
> note: lexical scopes ( 語彙範疇 )

![](https://i.imgur.com/hcHFnPB.png)

**Closure 閉包**
>[color=#99BBFF] Closure is when a function “remembers” its lexical scope even when the function is executed outside that 
>
>
![](https://i.imgur.com/MMAncah.png)

**Hoisting 提升**
>[color=#99BBFF] JavaScript’s default behavior of moving declarations to the top.

**let 跟 const 有 hoisting 嗎？**
>[color=#99BBFF] All declarations are “hoisted”, the difference between var/function/function declarations and let/const/class declara­tions is the initialisation.
還是有 hoisting ，只是初始化行為跟 var 不同
>
>var: 變數會被初始化為 undefined
let, const : 不會先被初始化所以在賦值之前的 Temporal Dead Zone(TDZ, 時間死區) 取值會發生錯誤。

![](https://i.imgur.com/GKA7RBA.png)

**Event loop**
>[color=#99BBFF]
>
> JS is single thread. so it only do one thing at a time. But if something stuck there like calling API need 3 seconds, program do nothing but wait? Not exactly! Event loop come to solve this problem.
>Every time has asynchronous operation -> threads -> queue -> stack
>優先執行順序:
> - Tasks
> - microtasks 如 promise
> - queues 非同步事件如 click、setTimeout、ajax

![](https://i.imgur.com/zmEhk4w.png)


---
## [ JS 觀念(下)](https://reurl.cc/YOrgWL)


---
## [矽谷牛的耕田筆記](https://www.facebook.com/technologynoteniu/posts/339605564540249)
1. Fast is better than good
2. Unlearn what you know about technical debt
3. There aren’t stupid questions
>[color=#99BBFF] ==“He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever.” — Chinese Proverb==
4. Communication outweighs technical skills
5. Just because you can doesn’t mean you should
6. Invaluable skills that will make a difference in your career:
>[color=#99BBFF] The easiest way to make an impact is to maximize the things you don’t work on. Learn to prioritize and delegate.
> - Learn to recognize high-impact work
> - ==Learn to recognize what wastes your time==
> - Learn to delegate effectively
7. Share like there’s no tomorrow
8. Take full responsibility
>[color=#99BBFF] ask every time when a problem happens: ==“What can I do differently next time?”==
Look inward every time, no matter what.
Finding justifications is easy. There’s always a way to explain why things didn’t work. It’s also a sure way to stay mediocre.
9. The best code is the one nobody wrote
10. If you don’t test, it doesn’t work
>[color=#99BBFF] test your code is IMPORTANT!
11. Embrace(to accept something enthusiastically) failures
>[color=#99BBFF] If you don’t fail, you don’t learn.


---

==8/1任務 1==
1. 建立一個 xhr 的 branch
```bash=
$ git branch xhr
$ git switch xhr
```
2. 在 basic 資料夾建立一個 xhr.html
3. 編寫 xhr.html 的準備工作
   https://github.com/azole/node-workshop/blob/xhr/basic/xhr.html
4. git add , git ci
5. git push -u origin xhr
6. 去 github 確認看看有沒有推上去


==8/1任務 2==

1. 完成同步與非同步的 XMLHttpRequest 請求 
```bash=
var xhr = new XMLHttpRequest();  // XML的一個請求物件
xhr.onload = function() {
    if(this.status === 200) {
       // 顯示成功的訊息 this.responseText
    } else {
       // 不是200，那顯示一下 this.status
    }
}

// method, url, async (預設值是true)
// 同步: false
// 非同步(異步): true
xhr.open("GET", "http://18.237.113.31:3000/", false);
xhr.send();
```
2. 測試一下有沒有問題
3. commit 到 xhr 分支
4. 發 pull request
5. 找一個同組的同學(viewer)，幫你做 code review，負責 review 的同學要幫忙看有沒有問題，有問題就留言討論。
6. 直到 viewer 覺得 OK，就可以按下同意 merge。
7. 回到 terminal，切換回 main/master，git pull
```bash=
$ git switch main (或是 master)
# 更新
$ git pull
```


==8/1任務3==

小組討論

Q. code review 到底要 review？

請組長討論完之後，總結大家的結論紀錄在 basic/review.md 

==8/4 星期三晚上 12 點前要繳交==

----

NodeJS (JS) 是單執行緒、非阻塞

JS 設計哲學: 我不想要處理 race condition、我不想要有很多 content switch 成本
```
JS -> single-thread --> non-blocking 非阻塞 --> WebAPI, NodeJS API
   -> callback / queue / event-loop
     --> callback hell
```     
![](https://i.imgur.com/cuHysRx.png)

==8/1任務4==

1. 建立一個 callback 分支，切換到 callback 分支
```
$ git branch callback
$ git switch callback
```
3. 建立 callback 資料夾，在裡面建立 callback1.js
   https://github.com/azole/node-workshop/blob/callback/callback/callback1.js
3. 測試、練習一下、玩一下 callback hell
4. add, commit, push 上去
```bash=
$ git push -u origin callback
5. 發 pull request
6. 找一個同組的同學view
7. review完成，就 merge
8. 更新本地的 main 或 master 分支
```

==8/1任務5==

(optional)

繳交這兩天的作業筆記與心得(只有心得也可以)，可以放在 github 上，或是 email 給我都可以，之前你們的學長姐也有 email 給我他 hackmd 或是 notion 的網址，都可以，形式不拘、字數不拘。

## 心得
![](https://i.imgur.com/HGwDwFH.png)

這兩天的課學到的東西超乎想像，除了node.js還學到作業系統.演算法.資料結構.網路基本觀念，老實說我還是記不得這些，尤其像網路七層，我只知道我們現在學的程式是用在應用層(說錯麻煩請老師糾正我，謝謝老師)。

來這裡上課之前就想學資料結構，演算法，物件導向等等的知識，想要不只知道怎麼做how，也知道為什麼這麼做why，所以在這裡能學到這些覺得很開心。這些內容之前有看過一點點(大概2%)，但幾乎也都忘光了，再次聽到CPU  RAM registers，是的，這些可能對很多人來說可能是common sense的東西，我一概不知。上次處理git版本時，老師看了我的電腦說，RAM只有8G太少了，我們現在做的事情很耗效能，RAM要大一點至少要16G，那時我才知道，原來是這樣啊!我覺得學電腦程式至少也要了解一些相關的電腦知識，不然有種住別人家，但是根本不認識主人的感覺，我自己是很喜歡這樣的學習。還有big O O(1) O(n) O(n^2)...等等等好像見到很陌生的朋友，忽然有一點點點熟悉感!

根據對自己的觀察，我是很不會一心多用的人，content switch成本超高，之前工作很常會遇到在做某件事時，忽然有事情插隊或是同事主管跟我講話，做事效率就會變很差。之前工作的公司主管就有提醒我這點，說做事要三心二意，一邊做事一邊聽他們講話。雖然後期比較能夠適應，但其實還是感覺得出來自己要聽他們說話時，其實不太能繼續進行手邊工作。之前有獨到一本書，書名叫"專注力 就是你的超能力"，主要就是在講專注力的重要，每個人每天都只有24小時，越是專注就讓產能最大化。可能我自己是個專一的人(感情?)，所以蠻認同作者的觀點，但必須說我的做事效率和專注力真的都還有極大需要改進的空間(大約有98%需要進步)，除了debug很花時間，找資料，找解答，效率都很差，常常花了一.兩小時還沒找到自己要的資料，或是還沒讀得懂的資料(好像進入迴圈，這個函式上次用過了)。講到這也有點離題了。我想表達的是，作筆記對我來說很不容易，幾乎只要做筆記就會漏掉老師當下在教的課，自己在時間分配與做事效率上，常常也覺得很想當天把老師教的內容看過一遍，但不管有什麼理由，實情卻是心有餘而力不足。因為作業的關係，才把這個筆記整理了一下，也發現有些內容我已經忘記了，所以又回頭看錄影檔，覺得這種感覺真的蠻不錯的。

老師在講同步非同步的時候，同學問了問題，覺得好像又清楚多一點，但還是覺得有似懂非懂的感覺，後來鼓起勇氣(?)問了問題才發現，真的有個地方沒有通，老師又再講解一次，才恍然大悟跟。還好沒有錯過發問的機會，(但有時候真的還來不及當下理清自己的問題在哪)。在老師的逼迫下，哈哈哈開玩笑的，在老師的引導下，我覺得上課氛圍變得越來越好，覺得很棒!!


---


喜歡老師分享的這首詩, 不知道記在哪, 就先記在這裡一下
:::info
《每個人都有自己的時區》

紐約時間比加州時間早三個小時，
New York is 3 hours ahead of California,

但加州時間並沒有變慢。
but it does not make California slow.

有人22歲就畢業了，
Someone graduated at the age of 22,

但等了五年才找到好的工作！
but waited 5 years before securing a good job!

有人25歲就當上CEO，
Someone became a CEO at 25,

卻在50歲去世。
and died at 50.

也有人遲到50歲才當上CEO，
While another became a CEO at 50,

然後活到90歲。
and lived to 90 years.

有人依然單身，
Someone is still single,

同時也有人已婚。
while someone else got married.

歐巴馬55歲就退休，
Obama retires at 55,

川普70歲才開始當總統。
but Trump starts at 70.

世上每個人本來就有自己的發展時區。
Absolutely everyone in this world works based on their Time Zone.

身邊有些人看似走在你前面，
People around you might seem to go ahead of you,

也有人看似走在你後面。
some might seem to be behind you.

但其實每個人在自己的時區有自己的步程。
But everyone is running their own RACE, in their own TIME.

不用嫉妒或嘲笑他們。
Don't envy them or mock them.

他們都在自己的時區裡，你也是！
They are in their TIME ZONE, and you are in yours!

生命就是等待正確的行動時機。
Life is about waiting for the right moment to act.

所以，放輕鬆。
So, RELAX.

你沒有落後。
You're not LATE.

你沒有領先。
You're not EARLY.

在命運為你安排的屬於自己的時區裡，一切都準時。
You are very much ON TIME, and in your TIME ZONE Destiny set up for you
:::