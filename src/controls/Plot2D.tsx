import * as React from 'react'

import styled from '../utility/styled'

export interface Props {
  data: number[][]
  inverted?: boolean
  width?: number
}

export class Plot2D extends React.Component<Props> {
  static defaultProps = {
    inverted: false,
    width: 24,
  }

  render() {
    const rowCount = this.props.data.length
    const columnCount = this.props.data[0].length
    return (
      <Wrapper
        viewBox={`0 0 ${columnCount} ${rowCount}`}
        width={this.props.width!}
      >
        {this.props.data.map((columns, rowIndex) =>
          columns.map((color, columnIndex) => {
            if (this.props.inverted) color = 255 - color
            return (
              <rect
                fill={`rgb(${color}, ${color}, ${color})`}
                height={1}
                key={`${columnIndex},${rowIndex}`}
                width={1}
                x={columnIndex}
                y={rowIndex}
              />
            )
          }),
        )}
      </Wrapper>
    )
  }
}

const Wrapper = styled<{ width: number }, 'svg'>('svg')`
  border: 2px solid black;
  width: ${p => p.theme.units(p.width)};
`
