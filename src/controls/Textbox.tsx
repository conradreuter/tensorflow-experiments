import * as React from 'react'

import styled from '../utility/styled'

export interface Props {
  onChange: (value: string) => void
  value: string
  waitForBlurOrEnter?: boolean
}

interface State {
  value: string
}

export class Textbox extends React.Component<Props, State> {
  static defaultProps = {
    waitForBlurOrEnter: false,
  }

  state = {
    value: '',
  }

  static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State,
  ): Partial<State> | null {
    if (nextProps.value === prevState.value) return null
    return { value: nextProps.value }
  }

  render() {
    return (
      <Input
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        value={this.state.value}
      />
    )
  }

  handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.handleBlurOrEnter()
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    this.setState({ value })
    if (!this.props.waitForBlurOrEnter) this.props.onChange(value)
  }

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') this.handleBlurOrEnter()
  }

  handleBlurOrEnter() {
    if (this.props.waitForBlurOrEnter) this.props.onChange(this.state.value)
  }
}

const Input = styled('input')``
