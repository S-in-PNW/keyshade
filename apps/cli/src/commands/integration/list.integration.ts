import BaseCommand from '../base.command'

export class ListIntegration extends BaseCommand {
  getName(): string {
    return 'list'
  }

  getDescription(): string {
    return 'List an integration'
  }

  canMakeHttpRequests(): boolean {
    // 1. check if the cli is valid.
    // 2.1 above is invalid, return false with error message.
    // 2.2 above is valid,
    //      option 1: 2.2.1 send the cli to the SERVER to do logic to get if can make the request.
    //                If this is the case, what function needs to be called?
    //      option 2: 2.2.2 if the request needs to be done here inside this function.
    //                If this is the case, what should the logic be?
    // 3. return true if the cli is valid, otherwise return false.
    return true
  }
}
// TODO:
// 1. getUsage() ?? All (create, delete, get, list, update) need? OR some of them needs?
// 2. getXXX() ???
