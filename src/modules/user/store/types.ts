import { Id, IDictionary, IPayload } from "@/types"

export interface IProfile {
  id: Id
  name: string
  md5: string
}

export interface IState {
  profiles: IDictionary<IProfile>
}

/* MUTATIONS */

/* ACTIONS */

export interface IFetchProfile extends IPayload {
  type: "fetchProfile"
  userId: Id
}

export interface IEmailPasswordReset extends IPayload {
  type: "emailPasswordReset"
  email: string
}
