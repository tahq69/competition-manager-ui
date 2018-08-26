import { saveEntity, deleteEntity } from "@/helpers/service";
import { url as createUrl, httpContext } from "@/helpers/rest";

import {
  FetchGroupsPayload,
  FetchCategoriesPayload,
  FetchGroupPayload,
  FetchCategoryPayload,
  SaveGroupPayload,
  SaveCategoryPayload
} from "@/modules/competitions/groups/typings";
import { Category, Group } from "@/modules/competitions/models";

export async function fetchGroups(payload: FetchGroupsPayload) {
  return await httpContext(async http => {
    const urlTpl =
      "competitions/{competition_id}/disciplines/{discipline_id}/groups";
    const url = createUrl(urlTpl, { urlReplace: payload });

    const { data }: { data: any[] } = await http.get(url);

    return data.map(val => new Group(val));
  });
}

export async function fetchCategories(payload: FetchCategoriesPayload) {
  return await httpContext(async http => {
    const urlTemplate =
      "competitions/{competition_id}/disciplines/{discipline_id}/categories";
    const url = createUrl(urlTemplate, { urlReplace: payload });

    const { data }: { data: any[] } = await http.get(url);

    return data.map(val => new Group(val));
  });
}

export async function fetchGroup(payload: FetchGroupPayload) {
  return await httpContext(async http => {
    const urlTpl =
      "competitions/{competition_id}/disciplines/{discipline_id}/groups/{id}";
    const url = createUrl(urlTpl, { urlReplace: payload });

    const { data } = await http.get(url);
    return new Group(data);
  });
}

export async function fetchCategory(payload: FetchCategoryPayload) {
  return await httpContext(async http => {
    const urlTpl =
      "competitions/{competition_id}/disciplines/{discipline_id}/" +
      "groups/{category_group_id}/categories/{id}";
    const url = createUrl(urlTpl, { urlReplace: payload });

    const { data } = await http.get(url);
    return new Category(data);
  });
}

export async function saveGroup(payload: SaveGroupPayload) {
  return await httpContext(async http => {
    const entity = new Group(payload);
    return await saveEntity(entity, Group);
  });
}

export async function saveCategory(payload: SaveCategoryPayload) {
  return await httpContext(async http => {
    const entity = new Category(payload);
    return await saveEntity(entity, Category);
  });
}

export async function deleteGroup(payload: FetchGroupPayload) {
  await httpContext(async http => {
    const entity = new Group(payload);
    await deleteEntity(entity);
  });
}

export async function deleteCategory(payload: FetchCategoryPayload) {
  await httpContext(async http => {
    const entity = new Category(payload);
    await deleteEntity(entity);
  });
}
