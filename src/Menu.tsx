import { shade, transparentize } from 'polished'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

import { PAGES } from './PAGES'
import styled from './utility/styled'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export class Menu extends React.Component<Props> {
  render() {
    return (
      <Wrapper isOpen={this.props.isOpen}>
        <CloseButton onClick={this.props.onClose}>X</CloseButton>
        {PAGES.map((page, index) => (
          <PageLink
            exact
            key={index}
            onClick={this.props.onClose}
            replace
            to={page.path}
          >
            {page.title}
          </PageLink>
        ))}
      </Wrapper>
    )
  }
}

const Wrapper = styled<{ isOpen: boolean }, 'nav'>('nav')`
  background: ${p => transparentize(0.1, shade(0.2, p.theme.colors.blue))};
  bottom: -5vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  opacity: ${p => (p.isOpen ? 1 : 0)};
  position: fixed;
  right: 0;
  text-align: center;
  transform: translate3d(0, ${p => (p.isOpen ? 0 : '-5vh')}, 0);
  top: 0;
  transition: all 0.2s;
  visibility: ${p => (p.isOpen ? 'visible' : 'hidden')};
  z-index: ${p => p.theme.zIndex('menu')};
`

const CloseButton = styled('button')`
  background: transparent;
  border: 0;
  cursor: pointer;
  font-size: ${p => p.theme.units(3.2)};
  position: absolute;
  right: ${p => p.theme.units(1.5)};
  top: ${p => p.theme.units(1)};
`

const PageLink = styled(NavLink)`
  display: block;
  font-size: ${p => p.theme.units(1.2)};
  line-height: ${p => p.theme.units(1.8)};
  text-decoration: none;

  &.active {
    color: ${p => p.theme.colors.yellow};
  }

  &:hover {
    font-weight: bold;
    text-decoration: underline;
  }
`
