import { Pagination } from "@/helpers";
import { saveEntity } from "@/helpers/service";
import { httpContext } from "@/helpers/rest";
import { store } from "@/store";
import { Id } from "@/typings";

import { CompetitionCreate } from "../models/competition-create";

interface ISaveCompetition {
  title: string;
  subtitle: string;
  registration_till: string;
  organization_date: string;
  team_id: Id;
}

class CompetitionService {
  public async saveCompetition(payload: ISaveCompetition) {
    return await httpContext(async http => {
      const entity = new CompetitionCreate(payload);
      return await saveEntity(entity, CompetitionCreate);
    });
  }
}

export default new CompetitionService();
