interface ThemeBase<TZIndexKey extends string> {
  colors: {
    blue: string
    gray: string
    green: string
    orange: string
    yellow: string
  }
  fontSize: number
  zIndexKeys: TZIndexKey[]
}

interface Theme<TZIndexKey extends string> extends ThemeBase<TZIndexKey> {
  units(factor: number): string
  zIndex(key: TZIndexKey): number
}

export const THEME = makeTheme({
  colors: {
    blue: '#094a8e',
    gray: '#2c302e',
    green: '#679436',
    orange: '#f46036',
    yellow: '#fabc3c',
  },
  fontSize: 18,
  zIndexKeys: ['menu'],
})

function makeTheme<TZIndexKey extends string>(
  base: ThemeBase<TZIndexKey>,
): Theme<TZIndexKey> {
  return {
    ...base,
    units: factor => `${factor * base.fontSize}px`,
    zIndex: key => base.zIndexKeys.indexOf(key) + 1,
  }
}
