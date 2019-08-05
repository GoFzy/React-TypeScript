import React, {MouseEvent} from 'react';

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
      <div style={{userSelect: 'none'}} onClick={this.clickHandle}>点击次数：{this.state.count}</div>
    )
  }
}

export default App;