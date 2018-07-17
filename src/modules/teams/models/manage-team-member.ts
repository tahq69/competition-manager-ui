import { Id } from "@/typings";

export class ManageTeamMember {
  public team_id: Id = 0;

  public id: Id = 0;
  public user_id: Id = 0;
  public name: string = "";
  public roles: string[] = [];
}
