import { Id } from "@/types"

export interface IAudit {
  at: Date
  by: number
  name: string
}

export interface ICreatedAudit extends IAudit {
  creator: any
}

export interface IModifiedAudit extends IAudit {
  modifier: any
}

export class Entity {
  public id!: Id
  public created!: ICreatedAudit
  public updated!: IModifiedAudit

  public createUrl!: string
  public updateUrl!: string

  /**
   * Update current instance base properties.
   * @param data
   */
  public updateProps(data: any) {
    this.id = data.id

    this.created = {
      at: data.created_at,
      by: data.created_by,
      name: data.created_by_name,
      creator: data.creator,
    }

    this.updated = {
      at: data.updated_at,
      by: data.updated_by,
      name: data.updated_by_name,
      modifier: data.modifier,
    }
  }
}
