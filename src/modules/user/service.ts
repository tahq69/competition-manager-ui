import { url as createUrl, httpContext } from "@/helpers/rest";
import { getters } from "@/store";

import { Profile } from "./models/profile";
import { IFetchUserProfile, IResetPassword } from "./typings";

class UserService {
  public async fetchUserProfile(payload: IFetchUserProfile): Promise<Profile> {
    return await httpContext(async http => {
      if (!payload.id) payload.id = getters.user.id;
      const url = createUrl("users/{id}", { urlReplace: payload });

      const response = await http.get(url);
      return new Profile(response.data);
    });
  }

  public async emailPasswordReset(payload: { email: string }) {
    return await httpContext(async http => {
      const url = createUrl("password/email");
      await http.post(url, { email: payload.email });
    });
  }

  public async resetPassword(payload: IResetPassword): Promise<string> {
    return await httpContext(async http => {
      const url = createUrl("password/reset");
      const response = await http.post(url, payload);
      return response.data.status;
    });
  }
}

export default new UserService();
