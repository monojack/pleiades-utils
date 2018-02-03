import { Kind, } from 'graphql'

export function isOperationDefinition ({ kind, } = {}) {
  return kind === Kind.OPERATION_DEFINITION
}
