export class NotFoundResourceError extends Error {
  constructor() {
    super('Not found resource')
  }
}