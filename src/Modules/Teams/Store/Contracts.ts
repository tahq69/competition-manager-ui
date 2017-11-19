import Team from "../Team"

export interface IState {
  teams: Team[]
}

export interface IPayload {
  type: string
}
