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

  async username(username: any): Promise<LoginDTO | undefined> {
    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      username
    );
    if (response) {
      return username;
    }
    return undefined;
  }
}