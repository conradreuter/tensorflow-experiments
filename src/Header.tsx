import * as React from 'react'
import { Route, Switch } from 'react-router'

import { PAGES } from './PAGES'
import styled from './utility/styled'

export interface Props {
  onMenuClick: () => void
}

export class Header extends React.Component<Props> {
  render() {
    return (
      <Wrapper>
        <MenuButton onClick={this.props.onMenuClick}>☰</MenuButton>
        <Switch>
          {PAGES.map((page, index) => (
            <Route exact key={index} path={page.path}>
              {() => page.title}
            </Route>
          ))}
        </Switch>
      </Wrapper>
    )
  }
}

const Wrapper = styled('header')`
  background: ${p => p.theme.colors.blue};
  color: white;
  font-size: ${p => p.theme.units(1.2)};
  line-height: ${p => p.theme.units(2.4)};
  padding: 0 ${p => p.theme.units(0.4)};
  text-align: center;
`

const MenuButton = styled('button')`
  background: transparent;
  border: 0;
  cursor: pointer;
  font-size: ${p => p.theme.units(1.68)};
  font-weight: bold;
  float: left;
  line-height: ${p => p.theme.units(2.4)};
`
