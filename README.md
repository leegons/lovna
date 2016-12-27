# lovna
一个模仿输入的js插件，支持自定义速度的输入、等待、回删，以及提供一个模拟光标。

## usage
``` js
new Lovna($("shower"), true)
    .print("text1", 100)
    .sleep(3000)
    .back(2, 30)
    .run();
```

## 接口说明
### Lovna(obj, needpointer)
obj: htmlobject 需要显示结果的html对象
needpointer: bool 是否需要开启光标, 默认不开启, 另外所有的事件结束后光标自动隐藏

### print(text, interval)
text: string 需要打印的字符串
interval: int 打印每个字的间隔时间(ms)

### sleep(time)
time: int 等待的时间

### back(len, html)
len: int 回删的长度，如果长度大于已经输出的长度，则以已经输出的长度为准
html: int 删除每个字的间隔时间(ms)


## DEMO
可以参考 example.html
预览网址: [talking.html](http://www.leegons.com/talking.html)
