   declare module "postcss-config" {
       const postcssConfig: import("postcss").AcceptedPlugin[] | { [key: string]: unknown };
       export default postcssConfig;
   }