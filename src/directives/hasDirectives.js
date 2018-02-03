export function hasDirectives (names = [], { directives = [], } = {}) {
  return directives.some(({ name: { value, } = {}, } = {}) =>
    names.includes(value)
  )
}
