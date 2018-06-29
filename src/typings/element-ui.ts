export interface ElForm {
  validate: (cb: (valid: boolean) => any) => any;
  resetFields: () => any;
}
