import * as TF from '@tensorflow/tfjs'
import * as React from 'react'

import { Label } from '../controls/Label'
import { Slider } from '../controls/Slider'
import styled from '../utility/styled'

interface State {
  a: number
  b: number
  results?: {
    add: number
    sub: number
    mul: number
    square: number
  }
}

export class Page extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = { a: 0, b: 0 }
    this.recalculate()
  }

  render() {
    return (
      <Wrapper>
        <Inputs>
          <Label text={`a: ${this.state.a.toFixed(2)}`}>
            <Slider
              min={-1}
              max={1}
              step={0.01}
              value={this.state.a}
              onChange={this.handleAChange}
            />
          </Label>
          <Label text={`b: ${this.state.b.toFixed(2)}`}>
            <Slider
              min={-1}
              max={1}
              step={0.01}
              value={this.state.b}
              onChange={this.handleBChange}
            />
          </Label>
        </Inputs>
        {this.state.results && (
          <Results>
            <Result>a.add(b) = {this.state.results.add.toFixed(2)}</Result>
            <Result>a.sub(b) = {this.state.results.sub.toFixed(2)}</Result>
            <Result>a.mul(b) = {this.state.results.mul.toFixed(2)}</Result>
            <Result>a.square() = {this.state.results.square.toFixed(2)}</Result>
          </Results>
        )}
      </Wrapper>
    )
  }

  handleAChange = (a: number) => {
    this.setState({ a }, this.recalculate)
  }

  handleBChange = (b: number) => {
    this.setState({ b }, this.recalculate)
  }

  recalculate = async () => {
    const [add, sub, mul, square] = await TF.tidy(() => {
      const a = TF.scalar(this.state.a)
      const b = TF.scalar(this.state.b)
      return TF.stack([a.add(b), a.sub(b), a.mul(b), a.square()])
    }).data()
    const results = { add, sub, mul, square }
    this.setState({ results })
  }
}

const Wrapper = styled('div')``

const Inputs = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

const Results = styled('ul')`
  list-style-type: none;
`

const Result = styled('li')``
