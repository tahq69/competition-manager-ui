import Vue from "vue";

import { saveEntity } from "@/helpers/service";
import { url as createUrl, httpContext } from "@/helpers/rest";
import { Id } from "@/typings";

import { Discipline } from "../models/discipline";

interface IFetchDisciplines {
  competition_id: Id;
}

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

class DisciplineService {
  public async fetchDisciplines(
    payload: IFetchDisciplines
  ): Promise<Discipline[]> {
    return await httpContext(async http => {
      const urlTpl = "competitions/{competition_id}/disciplines";
      const url = createUrl(urlTpl, { urlReplace: payload });

      const { data } = await http.get(url);
      return data.reduce((acc: Discipline[], val: any) => {
        acc.push(new Discipline(val));
        return acc;
      }, []);
    });
  }

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
