import { parse, } from 'graphql'

export function parseSourceOrDocument (sourceOrDocument) {
  return typeof sourceOrDocument === 'string'
    ? parse(sourceOrDocument)
    : sourceOrDocument
}
