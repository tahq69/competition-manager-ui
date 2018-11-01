import { url as createUrl, httpContext, Paginated } from "@/helpers";
import { getters } from "@/store";

import {
  FetchMessagePayload,
  FetchMessagesPayload,
  FetchProfilePayload,
  ReplyOnMessagePayload,
  ResetPasswordPayload,
  SendMessagePayload,
  TeamMemberInvitationPayload
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

export async function fetchMessage(payload: FetchMessagePayload) {
  return await httpContext(async http => {
    const props = { urlReplace: payload };
    const url = createUrl("user/messages/read/{id}", props);
    const response = await http.get(url);

    return new Message(response.data);
  });
}

export async function replyOnMessage(payload: ReplyOnMessagePayload) {
  return await httpContext(async http => {
    const url = createUrl("user/messages/{id}/reply", { urlReplace: payload });
    const response = await http.post(url, payload);

    return new Message(response.data);
  });
}

export async function sendMessage(payload: SendMessagePayload) {
  return await httpContext(async http => {
    const url = createUrl("user/messages");
    const response = await http.post(url, payload);

    return new Message(response.data);
  });
}

export async function fetchMessageCount() {
  return await httpContext(async http => {
    const url = createUrl("user/messages/count/unread");
    const response = await http.get(url);

    return response.data as number;
  });
}

export async function confirmTeamMemberInvitation(
  payload: TeamMemberInvitationPayload
) {
  await teamMemberInvitation({ ...payload, type: "confirm" });
}

export async function refuseTeamMemberInvitation(
  payload: TeamMemberInvitationPayload
) {
  await teamMemberInvitation({ ...payload, type: "refuse" });
}

async function teamMemberInvitation(
  payload: TeamMemberInvitationPayload & { type: "confirm" | "refuse" }
) {
  await httpContext(async http => {
    const url = createUrl("invitations/{message}/team-member/{member}/{type}", {
      urlReplace: payload
    });

    await http.get(url);
  });
}
