import { Pagination, Service } from "@/helpers";
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

class CompetitionService extends Service {
  public async saveCompetition(payload: ISaveCompetition) {
    return await this.safeContext(async (http, api) => {
      const entity = new CompetitionCreate(payload);
      return await this.save(entity, CompetitionCreate);
    });
  }
}

export default new CompetitionService();
