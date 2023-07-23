import axios, {CancelToken } from "axios";
import { UserDTO } from "../dto/User.dto";

const REST_API_URL = 'https://app-turnmasterapi-230715140732.azurewebsites.net/api';


export class UserService {
    private static instance?: UserService;

    public static getInstance(): UserService {
      if (UserService.instance === undefined) {
        UserService.instance = new UserService();
      }
      return UserService.instance;
    }

    static async getUser(cancelToken?: CancelToken, username?: string): Promise<UserDTO[]> {
      const response = await axios.get(`${REST_API_URL}/User`);
      if (response.data && Array.isArray(response.data)) {

          return response.data.map((e) => e);
      } else {
          return [];
      }
    }
/*
    static async updateUsername(currentUsername: string, newUsername: string): Promise<void> {
      try {
        await axios.patch(`${REST_API_URL}/user/update-username`, {
          currentUsername: currentUsername,
          modifiedUsername: newUsername,
        });
      } catch (error) {
        throw new Error('Failed to update username');
      }
    }*/
  
    static async updatePassword(username: string, currentPassword: string, modifiedPassword: string): Promise<void> {
      try {
        const payload = {
          username: username,
          currentPassword: currentPassword,
          modifiedPassword: modifiedPassword,
        };
  
        console.log("Request Payload:", payload);
  
        // Obtain the authentication token (you need to replace 'YOUR_AUTH_TOKEN' with the actual token)
        const authToken = 'YOUR_AUTH_TOKEN';
  
        // Set the authentication token in the request headers
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };
  
        await axios.patch(`${REST_API_URL}/user/update-password`, payload, { headers });
  
        console.log("Password update successful!");
      } catch (error: any) {
        console.error("Failed to update password:", (error as Error).message);
        throw new Error("Failed to update password");
      }
    }
}
