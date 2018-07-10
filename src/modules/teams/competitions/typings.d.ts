import { Id } from "@/typings";

export interface SaveCompetitionPayload {
  title: string;
  subtitle: string;
  registration_till: string;
  organization_date: string;
  team_id: Id;
}
