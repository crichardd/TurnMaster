export interface InscriptionDTO {
    username: string;
    password: string;
}
  
export const InscriptionTransformer: (
    item: any
) => InscriptionDTO | undefined = (item: any) => {
    const properties = item.properties;
    if (
      properties &&
      typeof properties.username === "string" &&
      typeof properties.password === "string" 
    ) {
      return {
        username: properties.username,
        password: properties.password
      };
    }
    return undefined;
};