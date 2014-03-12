# carousel

---

A nice CMD module.

---

## 用法

### 通过data属性

通过data属性可以很容易的控制轮播的定位。`data-slide`可以接受控制播放位置的`prev`或`next`关键字。另外，还可以通过`data-slide-to`传递以0开始的幻灯片下标。

`data-ride="carousel"`属性用来标记在页面加载之后即开始启动的轮播组件。

### 通过JavaScript

手动启动轮播组件：

```javascript
seajs.use(["$", "carousel"], function($){
    $('.carousel').carousel()
});
```

### 选项

可以将选项通过data属性或JavaScript传递。对于data属性，需要将选项名称放到`data-`之后，例如`data-interval=""`。

<table class="table table-bordered table-striped">
    <thead>
     <tr>
       <th style="width: 100px;">名称</th>
       <th style="width: 50px;">类型</th>
       <th style="width: 50px;">默认值</th>
       <th>描述</th>
     </tr>
    </thead>
    <tbody>
     <tr>
       <td>interval</td>
       <td>number</td>
       <td>5000</td>
       <td>幻灯片轮换的等待时间。如果为false，轮播将不会自动开始循环。</td>
     </tr>
     <tr>
       <td>pause</td>
       <td>string</td>
       <td>"hover"</td>
       <td>鼠标停留在幻灯片区域即暂停轮播，鼠标离开即启动轮播。</td>
     </tr>
     <tr>
       <td>wrap</td>
       <td>boolean</td>
       <td>true</td>
       <td>轮播是否持续循环。</td>
     </tr>
    </tbody>
</table>

### 方法

#### .carousel(options)

初始化轮播组件，接受一个可选的object类型的options参数，并开始幻灯片循环。

```javascript
seajs.use(["$", "carousel"], function($){
    $('.carousel').carousel({
        interval: 2000
    })
});
```

#### .carousel('cycle')

从左到右循环各帧。

#### .carousel('pause')

停止轮播。

#### .carousel(number)

将轮播定位到指定的帧上（帧下标以0开始，类似数组）。

#### .carousel('prev')

返回到上一帧。

#### .carousel('next')

转到下一帧。

### 事件

seaUI的轮播组件暴露了两个事件用于监听。

<table class="table table-bordered table-striped">
    <thead>
     <tr>
       <th style="width: 150px;">事件类型</th>
       <th>描述</th>
     </tr>
    </thead>
    <tbody>
     <tr>
       <td>slide.bs.carousel</td>
       <td>此事件在<code>slide</code>方法被调用之后立即出发。</td>
     </tr>
     <tr>
       <td>slid.bs.carousel</td>
       <td>当所有幻灯片播放完之后被触发。</td>
     </tr>
    </tbody>
</table>

```javascript
$('#myCarousel').on('slide.bs.carousel', function () {
  // do something…
})
```
