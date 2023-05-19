import { GameDTO } from "../dto/Game.dto";
import {Game} from "../interfaces/Game.Interface";
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
        this.baseUrl = "http://localhost:8080/api";
    }

    async getGames(): Promise<Game[]> {
        const response = await fetch(`${this.baseUrl}/game/list`);
        if (!response.ok) {
            throw new Error(`Failed to fetch games: ${response.statusText}`);
        }
        const data = await response.json();
        return data as Game[];
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
