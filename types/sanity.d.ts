declare module 'sanity/structure' {
  export interface StructureBuilder {
    list(): any;
    listItem(): any;
    documentTypeListItem(type: string): any;
  }

  export function structureTool(config?: any): any;
}
