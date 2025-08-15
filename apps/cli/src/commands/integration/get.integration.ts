import { Logger } from '@/util/logger'
import BaseCommand from '../base.command'
import ControllerInstance from '@/util/controller-instance'
import {
  type CommandActionData,
  type CommandArgument
} from 'src/types/command/command.types'

export class GetIntegration extends BaseCommand {
  getName(): string {
    return 'get'
  }

  getDescription(): string {
    return 'Get an integration'
  }

  getArguments(): CommandArgument[] {
    return [
      {
        name: '<Integration Slug>',
        description: 'Slug of the integration which you want to fetch.'
      }
    ]
  }

  canMakeHttpRequests(): boolean {
    return true
  }

  async action({ args }: CommandActionData): Promise<void> {
    const [integrationSlug] = args

    if (!integrationSlug) {
      Logger.error('Integration slug is required')
      return
    }

    Logger.info('Fetching Integration...')

    const {
      success,
      error,
      data: integration
    } = await ControllerInstance.getInstance().integrationController.getIntegration(
      { slug: integrationSlug },
      this.headers
    )

    if (success) {
      Logger.info(`Name: ${integration.name}`)
      Logger.info(`Slug: ${integration.slug}`)
      Logger.info(`Type: ${integration.type}`)
      Logger.info(`Project: ${integration.project?.name || 'N/A'}`)
      Logger.info(
        `Environments: ${integration.environments?.map((env) => env.name).join(', ') || 'None'}`
      )
      Logger.info(`Notify On: ${integration.notifyOn?.join(', ') || 'None'}`)
      Logger.info(`Created On: ${integration.createdAt}`)
      Logger.info(`Updated On: ${integration.updatedAt}`)

      if (integration.metadata) {
        Logger.info(
          `Metadata: ${JSON.stringify(integration.metadata, null, 2)}`
        )
      }
    } else {
      this.logError(error)
    }
  }
}
