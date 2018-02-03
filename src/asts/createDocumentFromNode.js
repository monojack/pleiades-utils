import { Kind, } from 'graphql'

export function createDocumentFromNode (ast) {
  if (!ast || ast.kind === Kind.DOCUMENT) {
    return ast
  }

  return {
    kind: 'Document',
    definitions: [ ast, ],
  }
}
