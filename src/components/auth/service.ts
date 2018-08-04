import { url as createUrl, httpContext } from "@/helpers/rest";

import { IAuthUser, ILogin, IRegister } from "@/components/auth/typings";

class UserService {
  public async fetchAuthenticatedUser(): Promise<IAuthUser> {
    return await httpContext(async http => {
      const url = createUrl("users/user");
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
    return await httpContext(async http => {
      const url = createUrl("oauth/token", { root: true });
      const { data } = await http.post(url, payload);
      return data;
    });
  }

  public async register(payload: IRegister): Promise<void> {
    return await httpContext(async http => {
      const url = createUrl("users");
      await http.post(url, payload);
    });
  }
}

export default new UserService();
