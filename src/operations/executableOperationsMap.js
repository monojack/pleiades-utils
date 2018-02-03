import { concatAST, } from 'graphql'
import { isOperationDefinition, } from './isOperationDefinition'
import { operationName, } from './operationName'
import { operationType, } from './operationType'

import { hasDirectives, rejectDirectives, } from '../directives'
import { createDocumentFromNode, } from '../asts'
import { isFragmentDefinition, requiredFragments, } from '../fragments'

import { mapObject, isNil, } from '../js'

const operationsMap = new Map()
function getExecutableOperation (fragments) {
  return function (def) {
    return concatAST([
      createDocumentFromNode(def),
      ...requiredFragments(def).map(f => createDocumentFromNode(fragments[f])),
    ])
  }
}

export function executableOperationsMap (document) {
  let operations = operationsMap.get(document)
  if (!operations) {
    const { fragment, ...definitionsObject } = document.definitions.reduce(
      (acc, node) => {
        let sanitizedNode
        const [ key, name, ] = isOperationDefinition(node)
          ? hasDirectives([ 'fetch', ], node)
            ? ((sanitizedNode = {
              ...node,
              directives: rejectDirectives([ 'fetch', ], node),
            }),
              [ 'fetch', operationName(node), ])
            : [ operationType(node), operationName(node), ]
          : isFragmentDefinition(node)
            ? [ 'fragment', operationName(node), ]
            : [ null, null, ]

        if (isNil(key) || isNil(name)) return acc

        return {
          ...acc,
          [key]: {
            ...(acc[key] || {}),
            [name]: sanitizedNode || node,
          },
        }
      },
      {}
    )

    operations = mapObject(mapObject(getExecutableOperation(fragment)))(
      definitionsObject
    )

    operationsMap.set(document, operations)
  }

  return operations
}
