import * as React from 'react'

export interface Props<T> {
  children: (value: T) => React.ReactNode
  source: Promise<T>
}

interface State {
  content: React.ReactNode
}

export class Await<T> extends React.Component<Props<T>, State> {
  hasBeenUnmounted = false
  state = {
    content: () => <div>Loading...</div>,
  }

  async componentDidMount() {
    const value = await this.props.source
    if (!this.hasBeenUnmounted) {
      const content = () => this.props.children(value)
      this.setState({ content })
    }
  }

  componentWillUnmount() {
    this.hasBeenUnmounted = true
  }

  render() {
    return this.state.content()
  }
}
