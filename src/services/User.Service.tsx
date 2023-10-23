import axios, {CancelToken } from "axios";
import { UserDTO } from "../dto/User.dto";

const REST_API_URL = 'http://localhost:8080/api';

export class UserService {
  private static instance?: UserService;

  public static getInstance(): UserService {
    if (UserService.instance === undefined) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  static async getAllUsers(token: string): Promise<UserDTO[] | undefined> {
    try {
      const response = await axios.get(`${REST_API_URL}/user/list`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
  }

  static async getUserId(token: string): Promise<UserDTO | undefined> {
    try {
      const apiUrl = `${REST_API_URL}/user/user`;
      const headers = {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      };
  
      const response = await axios.get(apiUrl, { headers });
  
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

        const authToken = '';
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };
  
        await axios.patch(`${REST_API_URL}/user/update-password`, payload, { headers });
      } catch (error: any) {
        console.error("Failed to update password:", (error as Error).message);
        throw new Error("Failed to update password");
      }
    }
}
