import { url as createUrl, httpContext } from "@/helpers/rest";
import { Id } from "@/typings";

import { Area } from "../models/area";

interface IFetchAreas {
  competition_id: Id;
}

interface IFetchArea extends IFetchAreas {
  id: Id;
}

class AreaService {
  public async fetchAreas(payload: IFetchAreas): Promise<Area[]> {
    return await httpContext(async http => {
      const urlTpl = "competitions/{competition_id}/areas";
      const url = createUrl(urlTpl, { urlReplace: payload });

      const { data } = await http.get(url);
      return data.reduce((acc: Area[], val: any) => {
        acc.push(new Area(val));
        return acc;
      }, []);
    });
  }

  public async fetchArea(payload: IFetchArea): Promise<Area> {
    return await httpContext(async http => {
      const urlTpl = "competitions/{competition_id}/disciplines/{id}";
      const url = createUrl(urlTpl, { urlReplace: payload });

      const { data } = await http.get(url);
      return new Area(data);
    });
  }
}

export default new AreaService();
