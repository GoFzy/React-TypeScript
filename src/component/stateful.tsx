import React from 'react'

interface Props {

}

interface State {

}

class Stateful extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    return(
      <div>{this.props.children}</div>
    )
  }
}

export default Stateful;