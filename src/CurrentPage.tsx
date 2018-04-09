import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { PageModule, PAGES } from './PAGES'
import { Await, Props as AwaitProps } from './utility/Await'
import styled from './utility/styled'

// TODO remove in TS 2.9
type AwaitPageModule = new (p: AwaitProps<PageModule>) => Await<PageModule>
const AwaitPageModule = Await as AwaitPageModule

export class CurrentPage extends React.Component {
  render() {
    return (
      <Wrapper>
        <Switch>
          {PAGES.map((page, index) => (
            <Route exact key={index} path={page.path}>
              {() => (
                <AwaitPageModule source={page.module}>
                  {module => <module.Page />}
                </AwaitPageModule>
              )}
            </Route>
          ))}
          <Route exact path="/" />
          <Redirect to="/" />
        </Switch>
      </Wrapper>
    )
  }
}

const Wrapper = styled('main')`
  flex: 1;
  overflow-y: scroll;
  padding: ${p => p.theme.units(0.5)} ${p => p.theme.units(0.75)};
`
