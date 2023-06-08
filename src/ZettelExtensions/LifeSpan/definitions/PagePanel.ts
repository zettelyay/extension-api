import { ZettelTypes } from '@zettelooo/api-types'
import { Id } from '@zettelooo/commons'
import { Scope } from '../../Scope'
import { HtmlContent } from '../../types/HtmlContent'
import { TypeBuilder } from '../TypeBuilder'
import { Registrar } from '../types'

export type PagePanel<PD = any, CD = any> = TypeBuilder<
  {
    pageId: Id
  },
  [Scope.Device, Scope.User, Scope.Space, Scope.Page],
  {
    page: ZettelTypes.Extension.Model.Page<PD>
    pageMembers: readonly ZettelTypes.Extension.Model.PageMember[]
    cards: readonly ZettelTypes.Extension.Model.Card<CD>[]
  },
  {
    // pasteTextIntoComposer(text: string, html?: string): { success: boolean }
  },
  {
    status(getter: () => Shared.Status): Registrar<Shared.Status.Reference>
    menuItem(getter: () => Shared.MenuItem): Registrar<Shared.MenuItem.Reference>
    message<S = undefined>(getter: () => Shared.Message<S>): Registrar<Shared.Message.Reference<S>>
    loadingIndicator(getter: () => string): Registrar
    composer<S = undefined>(getter: () => Shared.Composer<S>): Registrar<Shared.Composer.Reference<S>>
    quickAction(getter: () => Shared.QuickAction): Registrar<Shared.QuickAction.Reference>
    commandLinePromptInput(getter: () => Shared.CommandLinePromptInput): Registrar
  }
>

export namespace Shared {
  export interface Status {
    readonly readonly?: boolean
    readonly hideCardOwners?: boolean
    readonly hideDefaultComposer?: boolean
  }

  export namespace Status {
    export interface Reference {
      readonly update: (updates: Partial<Status> | ((previous: Status) => Partial<Status>)) => void
    }
  }

  export interface MenuItem {
    readonly title: string
    handler(): void
  }

  export namespace MenuItem {
    export interface Reference {
      readonly update: (updates: Partial<MenuItem> | ((previous: MenuItem) => Partial<MenuItem>)) => void
    }
  }

  export interface Message<S = undefined> extends HtmlContent<S> {
    readonly variant?: Message.Variant
    readonly onClose?: () => void | 'prevent'
    readonly hidden?: boolean
  }

  export namespace Message {
    export type Variant = 'success' | 'information' | 'warning' | 'error'

    export interface Reference<S = undefined> extends HtmlContent.Reference<S> {
      readonly update: (updates: Partial<Message<S>> | ((previous: Message<S>) => Partial<Message<S>>)) => void
    }
  }

  export interface Composer<S = undefined> extends HtmlContent<S> {
    readonly hidden?: boolean
  }

  export namespace Composer {
    export interface Reference<S = undefined> extends HtmlContent.Reference<S> {
      readonly update: (updates: Partial<Composer<S>> | ((previous: Composer<S>) => Partial<Composer<S>>)) => void
    }
  }

  export type QuickAction = {
    readonly title: string
    readonly description?: string
    readonly avatarUrl?: string
    readonly disabled?: boolean
  } & (
    | {
        readonly switchChecked?: undefined
        readonly onClick: () => void | Promise<void>
      }
    | {
        readonly switchChecked: boolean
        readonly onClick?: () => void | Promise<void>
        readonly onToggleSwitch?: (checked: boolean) => void | Promise<void>
      }
  )

  export namespace QuickAction {
    export interface Reference {
      readonly update: (updates: Partial<QuickAction> | ((previous: QuickAction) => Partial<QuickAction>)) => void
    }
  }

  export interface CommandLinePromptInput {
    readonly prompt: string
    readonly placeholder?: string
    readonly initialValue?: string
    readonly required?: boolean
    readonly onCancel?: () => void
    readonly onSubmit?: (value: string) => void
  }
}
