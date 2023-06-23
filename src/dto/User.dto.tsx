export interface UserDTO {
    username: string;
}
    
export const UserTransformer: (item: any) => UserDTO | undefined = (
    item: any
) => {
    const properties = item.properties;
    if (
      properties &&
      typeof properties.username === "string" 
    ) {
      return {
        username: properties.username,
      };
    }
    return undefined;
};