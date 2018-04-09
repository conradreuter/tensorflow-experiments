import { ThemeProvider } from 'emotion-theming'
import * as React from 'react'
import { HashRouter } from 'react-router-dom'

import { CurrentPage } from './CurrentPage'
import { Header } from './Header'
import { Menu } from './Menu'
import { THEME } from './THEME'
import styled from './utility/styled'

interface State {
  isMenuOpen: boolean
}

export class App extends React.Component<{}, State> {
  state = {
    isMenuOpen: false,
  }

  render() {
    return (
      <ThemeProvider theme={THEME}>
        <HashRouter>
          <Wrapper>
            <Header onMenuClick={this.handleMenuClick} />
            <Menu
              isOpen={this.state.isMenuOpen}
              onClose={this.handleMenuClose}
            />
            <CurrentPage />
          </Wrapper>
        </HashRouter>
      </ThemeProvider>
    )
  }

  handleMenuClick = () => {
    this.setState(({ isMenuOpen }) => ({
      isMenuOpen: !isMenuOpen,
    }))
  }

  handleMenuClose = () => {
    this.setState({ isMenuOpen: false })
  }
}

const Wrapper = styled('div')`
  display: flex;
  font-size: ${p => p.theme.units(1)};
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
`
