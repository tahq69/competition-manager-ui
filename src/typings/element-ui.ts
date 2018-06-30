export { ElForm } from "element-ui/types/form";

export type ElValidationType =
  | "string"
  | "number"
  | "boolean"
  | "method"
  | "regexp"
  | "integer"
  | "float"
  | "array"
  | "object"
  | "enum"
  | "date"
  | "url"
  | "hex"
  | "email";

export type ElValidateTriggerType = "change" | "blur";

export interface Rules {
  [key: string]: Array<Rule<any>>;
}

export interface ValidateCallback {
  (error?: Error): void;
}

export interface Validate<T = any> {
  (rule: Rule<T>, value: T, callback: ValidateCallback): void;
}

export interface Rule<T = any> {
  field?: string;

  fullField?: string;

  type?: ElValidationType;

  validator?: Validate<T>;

  message?: string;

  trigger?: ElValidateTriggerType | ElValidateTriggerType[];

  required?: boolean;

  min?: number;

  max?: number;

  pattern?: RegExp;

  length?: number;

  /**
   * on type 'enum' provide valid enum values.
   */
  enum?: any[];

  /**
   * on type 'object' validation can be nested.
   */
  fields?: { [key: string]: Rule };
}
