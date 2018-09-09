import { url as createUrl, httpContext, Paginated } from "@/helpers";
import { getters } from "@/store";

import {
  FetchMessagesPayload,
  FetchProfilePayload,
  ResetPasswordPayload
} from "@/modules/user/typings";
import { Profile, Message } from "@/modules/user/models";

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

export async function fetchMessages(payload: FetchMessagesPayload) {
  return await httpContext(async http => {
    const type = payload.outbox ? "outbox" : "inbox";
    const paging = payload.paging.urlParams;
    const url = createUrl("user/messages", { params: { type, ...paging } });
    const response = await http.get(url);

    return new Paginated(response, r => new Message(r));
  });
}
