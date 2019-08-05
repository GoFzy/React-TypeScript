# 使用TypeScript定义事件
## 一、获取事件处理对象
在我们进行事件注册时，经常会在事件处理函数中使用到事件对象 `event`,比如通过 `event.target` 获取当前点击事件的 `dom` 节点。  
一开始最初的想法是，在定义点击事件处理函数时，将 `event` 设置为 `object` 类型， 但这样导致的问题是，`obejct` 类型中不存在 `target` 属性，即：
```ts
clickHandle = (event: object): void {
  console.log(event.target); //error Property 'target' does not exist on type 'object'.ts(2339)
}
```
因此我们不得不又将 `object` 替换为接口，并定义 `target` 类型，这样每定义一个事件都要进行类型定义。但如果将 `event` 的类型设置为 `any` 又会丢失静态类型检查的意义。  
幸运的时， `React` 的声明文件提供了 `Event` 对象的类型声明，为我们使用者省去了繁琐的工作。  
常用 `Event` 事件对象类型：
* `ClipboardEvent<T = Element>` 剪贴板事件对象
* `DragEvent<T = Element>` 拖拽事件对象
* `ChangeEvent<T = Element>`  Change 事件对象
* `KeyboardEvent<T = Element>` 键盘事件对象
* `MouseEvent<T = Element>` 鼠标事件对象
* `TouchEvent<T = Element>`  触摸事件对象
* `WheelEvent<T = Element>` 滚轮事件对象
* `AnimationEvent<T = Element>` 动画事件对象
* `TransitionEvent<T = Element>` 过渡事件对象

本节使用了一个点击计数组件进行了尝试:
```ts
interface State {
  count: number
};

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0,
    }
  }

  clickHandle = (event: MouseEvent): void => {
    console.log('当前点击对象：', event.target);
    this.setState({
      count: this.state.count + 1,
    })
  }

  render() {
    return (
      <div onClick={this.clickHandle}>点击次数：{this.state.count}</div>
    )
  }
}
```