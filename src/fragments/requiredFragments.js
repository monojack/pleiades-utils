import { visit, Kind, } from 'graphql'

export function requiredFragments (ast) {
  const fragments = []

  visit(ast, {
    leave ({ kind, name: { value, } = {}, }) {
      kind === Kind.FRAGMENT_SPREAD && fragments.push(value)
    },
  })

  return fragments
}
