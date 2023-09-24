import { GameDTO } from "../dto/Game.dto";
import axios from "axios";

export default class GameService {
    private readonly baseUrl: string;

    private static instance?: GameService;

    public static getInstance(): GameService {
      if (GameService.instance === undefined) {
        GameService.instance = new GameService();
      }
      return GameService.instance; 
    }

    constructor() {
        this.baseUrl = "http://85.31.239.81:8080/api/";
    }

    async getGames(): Promise<GameDTO[]> {
        const response = await fetch(`${this.baseUrl}/game/list`);
        if (!response.ok) {
            throw new Error(`Failed to fetch games: ${response.statusText}`);
        }
        const data = await response.json();
        return data as GameDTO[];
    }

    async addGame(addGame: any): Promise<GameDTO | undefined> {
      const name = await axios.post(
        "https://app-turnmasterapi-230715140732.azurewebsites.net/api/game/create",
        addGame
      );
  
      if (name) {
        console.log(name);
        return addGame;
      }
      return undefined;
    }

}
