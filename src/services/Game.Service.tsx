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
    const REST_API_URL = 'http://localhost:8080/api';
    this.baseUrl = "api";
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
        "http://localhost:8080/api/game/create",
        addGame
      );
  
      if (name) {
        console.log(name);
        return addGame;
      }
      return undefined;
    }

}
