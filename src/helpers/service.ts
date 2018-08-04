import Vue from "vue";

import { UserBase } from "@/components/auth/models/user-base";
import { Entity } from "@/helpers/entity";
import { url as createUrl, httpContext, http } from "@/helpers/rest";
import { ISearchUser } from "@/helpers/typings";

const log = Vue.logger.group("helpers.service");

export async function searchUser(payload: ISearchUser): Promise<UserBase[]> {
  return await httpContext(async http => {
    const url = createUrl("users/search?term={name}&id={id}", {
      urlReplace: { id: (payload.id || 0).toString(), name: payload.name }
    });

    const response = await http.get(url);
    const users = response.data.data.map((data: any) => new UserBase(data));

    return users;
  });
}

export async function saveEntity<T extends Entity>(
  entity: T,
  type: { new (data: any): T }
): Promise<T> {
  // If entity already exists, send patch request, otherwise - post.
  const id = parseInt((entity.id || 0).toString());
  const requestType = id > 0 ? "patch" : "post";
  const requestUrl = id > 0 ? entity.updateUrl : entity.createUrl;

  const url = createUrl(requestUrl, { urlReplace: entity });

  log("saveEntity", { url, entity, requestType });
  const { data } = await http[requestType](url, entity);

  return new type(data);
}

export async function deleteEntity<T extends Entity>(entity: T): Promise<void> {
  const url = createUrl(entity.updateUrl, { urlReplace: entity });
  const { data } = await http.delete(url);
  Vue.logger.log(`Deleted ${url} [${data}]`);
}
