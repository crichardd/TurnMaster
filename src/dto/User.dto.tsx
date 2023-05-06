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
        lastname: properties.lastname,
        firstname: properties.firstname,
      };
    }
    return undefined;
};