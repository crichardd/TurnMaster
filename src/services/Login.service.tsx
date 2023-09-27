import axios from "axios";
import { LoginDTO } from "../dto/Login.dto";

export class LoginService {
  private static instance?: LoginService;

  public static getInstance(): LoginService {
    if (LoginService.instance === undefined) {
      LoginService.instance = new LoginService();
    }
    return LoginService.instance;
  }

  private constructor() {}

  async login(username: string, password: string): Promise<string | undefined> {
    try {
      const response = await axios.post(
        "http://85.31.239.81:8080/api/auth/authenticate",
        { username, password }
      );

      if (response.data && response.data.token) {
        // Assuming the token is returned in the response data
        return response.data.token;
      }
      return undefined;
    } catch (error) {
      throw error; // Rethrow the error for handling in your component
    }
  }
}