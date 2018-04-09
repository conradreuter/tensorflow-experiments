import { lighten } from 'polished'
import * as React from 'react'

import styled from '../utility/styled'

export interface Props {
  min: number
  max: number
  step?: number
  value: number
  width?: number
  onChange: (value: number) => void
}

export class Slider extends React.Component<Props> {
  static defaultProps = {
    step: 1,
    width: 16,
  }

  wrapper: HTMLElement | null = null

  componentWillUnmount() {
    this.stopDragging()
  }

  render() {
    const diff = this.props.max - this.props.min
    const relpos = (this.props.value - this.props.min) / diff
    return (
      <Wrapper
        innerRef={x => (this.wrapper = x)}
        onMouseDown={this.handleMouseDown}
        width={this.props.width!}
      >
        <Rail />
        <Track to={relpos} />
        <Handle at={relpos} />
      </Wrapper>
    )
  }

  handleMouseDown = (event: React.MouseEvent<any>) => {
    if (event.button !== 0) return
    this.updateValue(event.pageX)
    this.startDragging()
    event.preventDefault()
  }

  handleMouseMove = (event: MouseEvent) => {
    this.updateValue(event.pageX)
  }

  handleMouseUp = (event: MouseEvent) => {
    this.updateValue(event.pageX)
    this.stopDragging()
  }

  updateValue(x: number) {
    if (!this.wrapper) return
    const { left: minX, right: maxX } = this.wrapper.getBoundingClientRect()
    if (x < minX) x = minX
    if (x > maxX) x = maxX
    const relpos = (x - minX) / (maxX - minX)
    const diff = this.props.max - this.props.min
    const scaled = relpos * diff
    const plusHalfStep = scaled + this.props.step! / 2
    const rounded = plusHalfStep - plusHalfStep % this.props.step!
    const value = rounded + this.props.min
    if (value !== this.props.value) this.props.onChange(value)
  }

  startDragging() {
    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  stopDragging() {
    document.removeEventListener('mouseup', this.handleMouseUp)
    document.removeEventListener('mousemove', this.handleMouseMove)
  }
}

const Wrapper = styled<{ width: number }, 'div'>('div')`
  cursor: grab;
  height: 16px;
  position: relative;
  width: ${p => p.theme.units(p.width)};
`

const Rail = styled('div')`
  background: ${p => lighten(0.7, p.theme.colors.gray)};
  height: 4px;
  position: absolute;
  top: 6px;
  width: 100%;
`

const Track = styled<{ to: number }, 'div'>('div')`
  background: ${p => lighten(0.3, p.theme.colors.blue)};
  height: 4px;
  position: absolute;
  top: 6px;
  width: ${p => p.to * 100}%;
`

const Handle = styled<{ at: number }, 'div'>('div')`
  background: white;
  border: 3px solid ${p => lighten(0.3, p.theme.colors.blue)};
  border-radius: 50%;
  height: 16px;
  left: calc(${p => p.at * 100}% - 8px);
  position: absolute;
  width: 16px;
`
