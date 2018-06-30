import { Rule, Validate } from "@/typings/element-ui";

export function rule<T = any>(rule: Rule<T>, message?: string): Rule<T> {
  return Object.assign({ trigger: "blur" }, { message }, rule);
}

export function required(message: string): Rule<any> {
  return rule({ required: true, message });
}

export function validate<T = any>(validator: Validate<T>): Rule<T> {
  return rule({ validator });
}
