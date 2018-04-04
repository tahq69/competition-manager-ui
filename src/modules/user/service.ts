import { Service } from "@/helpers";
import { getters } from "@/store";

import { Profile } from "./models/profile";
import { IFetchUserProfile } from "./typings";

class UserService extends Service {
  public async fetchUserProfile(payload: IFetchUserProfile): Promise<Profile> {
    return await this.safeContext(async (http, api) => {
      if (!payload.id) payload.id = getters.user.id;
      const url = api.url("users/{id}", { urlReplace: payload });

      const response = await http.get(url);
      return new Profile(response.data);
    });
  }

  public async emailPasswordReset(payload: { email: string }) {
    return await this.safeContext(async (http, api) => {
      const url = api.url("password/email");
      await http.post(url, { email: payload.email });
    });
  }
}

export default new UserService();
