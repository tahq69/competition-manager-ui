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

export default class Entity {
  public id: number
  public created: ICreatedAudit
  public updated: IModifiedAudit

  /**
   * Store or update current entity instance.
   * @returns {Promise<this>} Saver record instance.
   */
  public async save(): Promise<this> {
    if (this.id > 0) {
      return await this.update()
    }

    return await this.create()
  }

  /**
   * Update current instance base properties.
   * @param data
   */
  protected updateProps(data: any) {
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

  protected async create(): Promise<this> {
    throw new Error("Method not implemented.")
  }

  protected async update(): Promise<this> {
    throw new Error("Method not implemented.")
  }
}
