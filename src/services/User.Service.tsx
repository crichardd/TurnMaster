import axios, {CancelToken } from "axios";
import { UserDTO } from "../dto/User.dto";

const REST_API_URL = 'http://85.31.239.81:8080/api';


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
    static async getUserId(token: string): Promise<UserDTO | undefined> {
      try {
        const response = await axios.get(`${REST_API_URL}/user/user`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
  
        if (response.data) {
          return response.data;
        } else {
          return undefined;
        }
      } catch (error) {
        console.log(error);
        return undefined; // Default value in case of an error
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
        const authToken = 'YOUR_AUTH_TOKEN';
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
