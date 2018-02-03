import { Kind, } from 'graphql'

export function isFragmentDefinition ({ kind, } = {}) {
  return kind === Kind.FRAGMENT_DEFINITION
}
