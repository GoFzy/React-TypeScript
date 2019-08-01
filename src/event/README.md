# 使用TypeScript定义事件
## 三、事件处理
第一次写事件处理时，我是这么写的：
```ts
function handleClick(e: object) {
  console.log(e.target);
}
```
然后 `ts` 直接报错: `Property 'target' does not exist on type 'object'.` 说明在 `object` 类型中并未声明 `target` 属性，所以我使用一个接口来定义：
```ts

interface event {
  target: object,
}

function handleClick(e: event) {
  console.log(e.target);
}
```
每次都要声明 `event` 类型是很重复的工作，幸运的是 `React` 的声明文件提供了 `Event` 对象的类型声明，常用 **`Event`事件对象类型**：
* ClipboardEvent<T = Element> 剪贴板事件对象
* DragEvent<T = Element> 拖拽事件对象
* ChangeEvent<T = Element> Change 事件对象
* KeyboardEvent<T = Element> 键盘事件对象
* MouseEvent<T = Element> 鼠标事件对象
* TouchEvent<T = Element> 触摸事件对象
* WheelEvent<T = Element> 滚轮事件对象
* AnimationEvent<T = Element> 动画事件对象
* TransitionEvent<T = Element> 过渡事件对象
