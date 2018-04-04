import { Service } from "@/helpers/service";

import { IAuthUser, ILogin, IRegister } from "./types";

class UserService extends Service {
  public async fetchAuthenticatedUser(): Promise<IAuthUser> {
    return await this.safeContext(async (http, api) => {
      const url = api.url("users/user");
      const { data } = await http.get(url);

      return {
        email: data.email,
        id: data.id,
        name: data.name,
        roles: data.roles,
        team_roles: data.team_roles
      };
    });
  }

  public async fetchLoginToken(payload: ILogin) {
    return await this.safeContext(async (http, api) => {
      const url = api.url("oauth/token", { root: true });
      const { data } = await http.post(url, payload);
      return data;
    });
  }

  public async register(payload: IRegister): Promise<void> {
    return await this.safeContext(async (http, api) => {
      const url = api.url("users");
      await http.post(url, payload);
    });
  }
}

export default new UserService();
