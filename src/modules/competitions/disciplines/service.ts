import { saveEntity } from "@/helpers/service";
import { url as createUrl, httpContext } from "@/helpers/rest";

import {
  FetchDisciplinePayload,
  FetchDisciplinesPayload,
  SaveDisciplinePayload
} from "#/competitions/disciplines/typings";
import { Discipline } from "#/competitions/models";

export async function fetchDiscipline(payload: FetchDisciplinePayload) {
  return await httpContext(async http => {
    const urlTpl = "competitions/{competition_id}/disciplines/{id}";
    const url = createUrl(urlTpl, { urlReplace: payload });

    const { data } = await http.get(url);
    return new Discipline(data);
  });
}

export async function fetchDisciplines(payload: FetchDisciplinesPayload) {
  return await httpContext(async http => {
    const urlTpl = "competitions/{competition_id}/disciplines";
    const url = createUrl(urlTpl, { urlReplace: payload });

    const { data }: { data: any[] } = await http.get(url);
    return data.map(val => new Discipline(val));
  });
}

export async function saveDiscipline(payload: SaveDisciplinePayload) {
  return await httpContext(async http => {
    const entity = new Discipline(payload);
    return await saveEntity(entity, Discipline);
  });
}
