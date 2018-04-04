import { Location } from "vue-router";

import { Entity } from "@/helpers/entity";

export class User extends Entity {
  public md5: string = "";
  public name: string = "";

  constructor(data: any) {
    super();
    this.updateProps(data);
  }

  public updateProps(data: any) {
    super.updateProps(data);

    this.md5 = data.md5;
    this.name = data.name;
  }
}
