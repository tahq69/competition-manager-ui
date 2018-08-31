import { Id } from "@/typings";
import { Paging } from "@/helpers";

export interface FetchCompetitionPayload {
  id: Id;
}

export interface FetchCompetitionsPayload {
  owned?: boolean;
  paging: Paging;
}

export interface SaveCompetitionPayload {
  title: string;
  subtitle: string;
  registration_till: string;
  organization_date: string;
  ambulance: string;
  cooperation: string;
  equipment: string;
  invitation: string;
  price: string;
  prizes: string;
  program: string;
  rules: string;
}
