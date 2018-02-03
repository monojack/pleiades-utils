import { isOperationDefinition, } from './isOperationDefinition'

export function operationDefinitions ({ definitions = [], } = {}) {
  return definitions.filter(isOperationDefinition)
}
