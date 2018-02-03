export function rejectDirectives (names = [], { directives = [], } = {}) {
  return directives.filter(({ name: { value, }, }) => !names.includes(value))
}
