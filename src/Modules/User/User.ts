import Entity from "@/Components/Entity"

export default class User extends Entity {
  public name: string

  constructor(data) {
    super(data)

    this.name = data.name
  }
}
