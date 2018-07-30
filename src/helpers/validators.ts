import { Rule, Validate } from "@/typings";

export function rule<T = any>(rule: Rule<T>, message?: string): Rule<T> {
  return Object.assign({ trigger: "blur" }, { message }, rule);
}

export function required(message: string): Rule<any> {
  return rule({ required: true, message });
}

export function date(message: string): Rule<any> {
  return rule({ type: "date", message });
}

export function alphaDashSpace(message: string): Rule<any> {
  return rule({
    message,
    pattern: /^[A-Za-z0-9_ ]+$/
  });
}

export function validate<T = any>(validator: Validate<T>): Rule<T> {
  return rule({ validator });
}
