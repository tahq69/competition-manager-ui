import { Location } from "vue-router";

import { Entity } from "@/helpers/entity";

export class User extends Entity {
  public md5: string = "";
  public name: string = "";

  constructor(data: any) {
    super(data);
    this.updateProps(data);
  }

  public updateProps(data: any) {
    this.md5 = data.md5;
    this.name = data.name;
  }
}
