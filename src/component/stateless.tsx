import React, { SFC } from 'react';

interface Props {
  //其他自定义属性
  color: string,
}

const Stateless: SFC<Props> = props => {
  return (
    <div style={{color: props.color}}>{props.children}</div>
  )
}

export default Stateless;