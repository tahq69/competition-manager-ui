import { saveEntity, deleteEntity } from "@/helpers/service";
import { url as createUrl, httpContext } from "@/helpers/rest";
import { Id } from "@/typings";

import { Category, DisplayType } from "../models/category";
import { Group } from "../models/group";

interface IFetchGroups {
  competition_id: Id;
  discipline_id: Id;
}

interface IFetchCategories extends IFetchGroups {
  category_group_id: Id;
}

interface IFetchGroup extends IFetchGroups {
  id: Id;
}

interface IFetchCategory extends IFetchCategories {
  id: Id;
}

interface ISaveGroup extends IFetchGroup {
  max: number;
  min: number;
  rounds: number;
  short: string;
  time: number;
  title: string;
}

interface ISaveCategory extends IFetchCategory {
  display_type: DisplayType;
  max: number;
  min: number;
  short: string;
  title: string;
}

class GroupService {
  public async fetchGroups(payload: IFetchGroups): Promise<Group[]> {
    return await httpContext(async http => {
      const urlTpl =
        "competitions/{competition_id}/disciplines/{discipline_id}/groups";
      const url = createUrl(urlTpl, { urlReplace: payload });

      const { data } = await http.get(url);
      return data.reduce((acc: Group[], val: any) => {
        acc.push(new Group(val));
        return acc;
      }, []);
    });
  }

  public async fetchCategories(payload: IFetchCategories): Promise<Category[]> {
    return await httpContext(async http => {
      const urlTpl =
        "competitions/{competition_id}/disciplines/{discipline_id}" +
        "/groups/{category_group_id}/categories";
      const url = createUrl(urlTpl, { urlReplace: payload });

      const { data } = await http.get(url);
      return data.reduce((acc: Category[], val: any) => {
        acc.push(new Category(val));
        return acc;
      }, []);
    });
  }

  public async fetchGroup(payload: IFetchGroup): Promise<Group> {
    return await httpContext(async http => {
      const urlTpl =
        "competitions/{competition_id}/disciplines/{discipline_id}/groups/{id}";
      const url = createUrl(urlTpl, { urlReplace: payload });

      const { data } = await http.get(url);
      return new Group(data);
    });
  }

  public async fetchCategory(payload: IFetchCategory): Promise<Category> {
    return await httpContext(async http => {
      const urlTpl =
        "competitions/{competition_id}/disciplines/{discipline_id}/" +
        "groups/{category_group_id}/categories/{id}";
      const url = createUrl(urlTpl, { urlReplace: payload });

      const { data } = await http.get(url);
      return new Category(data);
    });
  }

  public async saveGroup(payload: ISaveGroup): Promise<Group> {
    return await httpContext(async http => {
      const entity = new Group(payload);
      return await saveEntity(entity, Group);
    });
  }

  public async saveCategory(payload: ISaveCategory): Promise<Category> {
    return await httpContext(async http => {
      const entity = new Category(payload);
      return await saveEntity(entity, Category);
    });
  }

  public async deleteGroup(payload: IFetchGroup): Promise<void> {
    await httpContext(async http => {
      const entity = new Group(payload);
      await deleteEntity(entity);
    });
  }

  public async deleteCategory(payload: IFetchCategory): Promise<void> {
    await httpContext(async http => {
      const entity = new Category(payload);
      await deleteEntity(entity);
    });
  }
}

export default new GroupService();
