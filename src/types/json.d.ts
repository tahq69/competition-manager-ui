declare module "*.res.json" {
  const value: { [key: string]: string };
  export default value;
}

declare module "*.json" {
  const value: any;
  export default value;
}
