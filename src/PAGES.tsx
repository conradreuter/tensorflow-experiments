import * as React from 'react'

export const PAGES: Page[] = [
  {
    path: '/00-playground',
    title: '00 - Playground',
    module: import('./00-playground/Page'),
  },
  {
    path: '/01-arithmetic',
    title: '01 - Arithmetic',
    module: import('./01-arithmetic/Page'),
  },
  {
    path: '/02-logistic-regression',
    title: '02 - Logistic regression',
    module: import('./02-logistic-regression/Page'),
  },
]

export interface Page {
  path: string
  title: string
  module: Promise<PageModule>
}

export interface PageModule {
  Page: React.ComponentClass<{}>
}
