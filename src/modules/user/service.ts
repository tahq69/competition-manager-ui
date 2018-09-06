import { url as createUrl, httpContext } from "@/helpers/rest";
import { getters } from "@/store";

import { Profile } from "@/modules/user/models";
import {
  FetchProfilePayload,
  ResetPasswordPayload
} from "@/modules/user/typings";

export async function fetchUserProfile(payload: FetchProfilePayload) {
  return await httpContext(async http => {
    if (!payload.id) payload.id = getters.user.id;
    const url = createUrl("users/{id}", { urlReplace: payload });

    const response = await http.get(url);
    return new Profile(response.data);
  });
}

export async function emailPasswordReset(payload: { email: string }) {
  return await httpContext(async http => {
    const url = createUrl("password/email");
    await http.post(url, { email: payload.email });
  });
}

export async function resetPassword(payload: ResetPasswordPayload) {
  return await httpContext(async http => {
    const url = createUrl("password/reset");
    const response = await http.post(url, payload);
    return response.data.status as string;
  });
}
