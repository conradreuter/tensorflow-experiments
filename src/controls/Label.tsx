import * as React from 'react'

import styled from '../utility/styled'

export interface Props {
  children: React.ReactNode
  text: string
}

export class Label extends React.Component<Props> {
  render() {
    return (
      <Wrapper>
        {this.props.text}
        <br />
        {this.props.children}
      </Wrapper>
    )
  }
}

const Wrapper = styled('label')`
  padding: ${p => p.theme.units(0.25)} 0 ${p => p.theme.units(0.5)};
`
