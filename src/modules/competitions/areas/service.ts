import { url as createUrl, httpContext } from "@/helpers/rest";
import { saveEntity } from "@/helpers/service";

import { Area } from "@/modules/competitions/models";
import {
  FetchAreaPayload,
  FetchAreasPayload,
  SaveAreaPayload
} from "@/modules/competitions/areas/typings";

export async function fetchAreas(payload: FetchAreasPayload): Promise<Area[]> {
  return await httpContext(async http => {
    const urlTpl = "competitions/{competition_id}/areas";
    const url = createUrl(urlTpl, { urlReplace: payload });

    const { data }: { data: Array<any> } = await http.get(url);
    return data.map((area: any) => new Area(area));
  });
}

export async function fetchArea(payload: FetchAreaPayload): Promise<Area> {
  return await httpContext(async http => {
    const urlTpl = "competitions/{competition_id}/disciplines/{id}";
    const url = createUrl(urlTpl, { urlReplace: payload });

    const { data } = await http.get(url);
    return new Area(data);
  });
}

export async function saveArea(payload: SaveAreaPayload) {
  return await httpContext(async () => {
    const area = new Area(payload);
    return await saveEntity(area, Area);
  });
}
