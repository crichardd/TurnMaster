import axios from "axios";
import { InscriptionDTO } from "../dto/Add.dto";

export class InscriptionService {
  private static instance?: InscriptionService;

  public static getInstance(): InscriptionService {
    if (InscriptionService.instance === undefined) {
      InscriptionService.instance = new InscriptionService();
    }
    return InscriptionService.instance;
  }

  private constructor() {}

  async inscription(inscription: any): Promise<InscriptionDTO | undefined> {
    const username = await axios.post(
      "http://63.33.61.128:3000/api/auth/signup",
      inscription
    );

    if (username) {
      console.log(username);
      return inscription;
    }
    return undefined;
  }
}