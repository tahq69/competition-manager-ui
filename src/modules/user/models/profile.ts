import { ProfileTeam } from "./profile-team";
import { User } from "./user";

export class Profile extends User {
  public teams: ProfileTeam[] = [];

  constructor(data: any) {
    super(data);
    this.updateProps(data);
  }

  public updateProps(data: any) {
    super.updateProps(data);

    if (data.teams) {
      this.teams = data.teams.map((t: any) => {
        return new ProfileTeam(t);
      });
    }
  }
}
