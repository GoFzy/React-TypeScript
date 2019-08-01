import React from 'react';
import Stateless from './stateless';
import Stateful from './stateful';

const App = () => {
  return (
    <>
      <Stateless children="我是一个无状态组件" color='blue' />
      <Stateful children="我是一个有状态组件" />
    </>
  )
}



export default App;
