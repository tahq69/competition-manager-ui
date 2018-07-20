import Vue from "vue";

import { saveEntity } from "@/helpers/service";
import { url as createUrl, httpContext } from "@/helpers/rest";
import { Id } from "@/typings";

import { Discipline } from "../models/discipline";
import { FetchDisciplinesPayload } from "#/competitions/disciplines/typings";

interface IFetchDiscipline {
  competition_id: Id;
  id: Id;
}

interface ISaveDiscipline {
  category_group_type: string;
  category_type: string;
  competition_id: Id;
  description: string;
  game_type: string;
  id: Id;
  short: string;
  title: string;
  type: string;
}

export async function fetchDisciplines(payload: FetchDisciplinesPayload) {
  return await httpContext(async http => {
    const urlTpl = "competitions/{competition_id}/disciplines";
    const url = createUrl(urlTpl, { urlReplace: payload });

    const { data }: { data: any[] } = await http.get(url);
    return data.map(val => new Discipline(val));
  });
}

class DisciplineService {
  public async fetchDiscipline(payload: IFetchDiscipline): Promise<Discipline> {
    return await httpContext(async http => {
      const urlTpl = "competitions/{competition_id}/disciplines/{id}";
      const url = createUrl(urlTpl, { urlReplace: payload });

      const { data } = await http.get(url);
      return new Discipline(data);
    });
  }

  public async saveDiscipline(payload: ISaveDiscipline): Promise<Discipline> {
    return await httpContext(async http => {
      const entity = new Discipline(payload);
      return await saveEntity(entity, Discipline);
    });
  }
}

export default new DisciplineService();
