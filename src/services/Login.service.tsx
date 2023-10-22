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
      const apiUrl = "http://localhost:8080/api/auth/authenticate"; 

      const response = await axios.post(apiUrl, { username, password });

      if (response.data && response.data.token) {
        return response.data.token;
      }
      return undefined;
    } catch (error) {
      throw error; 
    }
  }
}
