import { Service } from "@/helpers/service";
import { Id } from "@/types";

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

class GroupService extends Service {
  public async fetchGroups(payload: IFetchGroups): Promise<Group[]> {
    return await this.safeContext(async (http, api) => {
      const urlTpl =
        "competitions/{competition_id}/disciplines/{discipline_id}/groups";
      const url = api.url(urlTpl, { urlReplace: payload });

      const { data } = await http.get(url);
      return data.reduce((acc: Group[], val: any) => {
        acc.push(new Group(val));
        return acc;
      }, []);
    });
  }

  public async fetchCategories(payload: IFetchCategories): Promise<Category[]> {
    return await this.safeContext(async (http, api) => {
      const urlTpl =
        "competitions/{competition_id}/disciplines/{discipline_id}" +
        "/groups/{category_group_id}/categories";
      const url = api.url(urlTpl, { urlReplace: payload });

      const { data } = await http.get(url);
      return data.reduce((acc: Category[], val: any) => {
        acc.push(new Category(val));
        return acc;
      }, []);
    });
  }

  public async fetchGroup(payload: IFetchGroup): Promise<Group> {
    return await this.safeContext(async (http, api) => {
      const urlTpl =
        "competitions/{competition_id}/disciplines/{discipline_id}/groups/{id}";
      const url = api.url(urlTpl, { urlReplace: payload });

      const { data } = await http.get(url);
      return new Group(data);
    });
  }

  public async fetchCategory(payload: IFetchCategory): Promise<Category> {
    return await this.safeContext(async (http, api) => {
      const urlTpl =
        "competitions/{competition_id}/disciplines/{discipline_id}/" +
        "groups/{category_group_id}/categories/{id}";
      const url = api.url(urlTpl, { urlReplace: payload });

      const { data } = await http.get(url);
      return new Category(data);
    });
  }

  public async saveGroup(payload: ISaveGroup): Promise<Group> {
    return await this.safeContext(async (http, api) => {
      const entity = new Group(payload);
      return this.save(entity);
    });
  }

  public async saveCategory(payload: ISaveCategory): Promise<Category> {
    return await this.safeContext(async (http, api) => {
      const entity = new Category(payload);
      return this.save(entity);
    });
  }

  public async deleteGroup(payload: IFetchGroup): Promise<void> {
    await this.safeContext(async (http, api) => {
      const entity = new Group(payload);
      this.delete(entity);
    });
  }

  public async deleteCategory(payload: IFetchCategory): Promise<void> {
    await this.safeContext(async (http, api) => {
      const entity = new Category(payload);
      this.delete(entity);
    });
  }
}

export default new GroupService();
