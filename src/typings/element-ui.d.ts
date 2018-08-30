declare module "element-ui/lib/locale/lang/en" {

}

declare module "element-ui/lib/locale/lang/lv" {

}

declare module "element-ui/src/utils/date" {
  export const parse: (dateStr: string, format: string) => Date | boolean;
  export const format: (dateObj: Date | number, mask: string) => string;
}
