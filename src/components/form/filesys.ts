import { isDefined } from "@/helpers";

const stack: { [key: string]: (url: string) => any } = {};

const w = window as any;
w.cripFilesystemManager = (url: string, params: { id: string }) => {
  if (isDefined(stack[params.id])) stack[params.id](url);
};

export default {
  register: (id: string, fn: (url: string) => any): void => {
    stack[id] = fn;
  }
};
