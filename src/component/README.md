# 使用TypeScript定义React组件
## 一、无状态组件
### 2.1 Stateless Component写法
在 `@types/react` 预先定义了泛型 `type SFC<P>`，它是 `StatelessComponent<P>` 的别名，其内部预先定义了 `children` 和一些其他属性，譬如 `defaultProps`, `displayName` , 这样就不用每次自己写:
```ts
// ./src/component/stateless.tsx
import React, { SFC } from 'read'

interface Props {
  //其他自定义属性
  color: string
}

export const Stateless: SFC<Props> = props => {
  return (
    <div>{props.children}</div>
  )
}

// ./src/component/app.tsx
import { Stateless } from './stateless'

const App = ()=> {
  return (
    <>
      <Stateless children="这是一个无状态组件" color="blue" />
    </>
  )
}
```
那么 `SFC` 类型到底是如何定义的呢？ 我们来看一下源码 `node_modules\_@types_react@16.8.23@@types\react\index.d.ts` 文件中搜索`type SFC`:
```ts
type SFC<P = {}> = FunctionComponent<P>;
interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement | null;
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}
```
可以看到在 `React` 的声明文件中 已经使用泛型定义了一个 `SFC` 接口，使用这个接口可以避免我们重复定义 `children`、 `propTypes`、 `contextTypes`、 `defaultProps`、`displayName` 的类型。而对于其他属性和方法则需要我们自己定义类型。

## 二、有状态组件
同样在 `React` 的声明文件中也是用泛型对 `Props` 和 `State` 的类型进行了定义。我们参考下源码，`node_modules\_@types_react@16.8.23@@types\react\index.d.ts` 文件中搜索`class Component`:
```ts
class Compoennt<P,S> {
  ...
  readonly props: Readonly<P> & Readonly<{ children?: ReactNode }>;
  state: Readonly<S>;
  ...
}
```
`Component` 泛型类在接收到 `P`， `S` 这两个泛型变量后，将只读属性 `props` 类型声明为**交叉**类型，即`Readonlu<P>`(自定义) + `Readonly<{ children?: ReactNode }>`(声明文件定义)，使其支持 `children` 和我们自定义声明的其他属性。  
此外，通过泛型的类型别名 `Readonly` 将 `props` 的所有属性都设置为只读属性。一下就是一个简单的有状态组件定义：
```ts
// ./src/component/stateful.tsx
interface Props {};
interface State {};

class Stateful extends React.Componet<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return(
      <div>{this.props.children}</div>
    )
  }
}

export default Stateful
```