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
      "http://85.31.239.81:8080/api/auth/register",
      inscription
    );

    if (username) {
      return inscription;
    }
    return undefined;
  }
}