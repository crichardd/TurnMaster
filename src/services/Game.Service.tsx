import { GameDTO } from "../dto/Game.dto";
import axios from "axios";

const REST_API_URL = 'http://localhost:8080/api';

export default class GameService {

    private static instance?: GameService;

    public static getInstance(): GameService {
      if (GameService.instance === undefined) {
        GameService.instance = new GameService();
      }
      return GameService.instance; 
    }

    async getGames(token: string): Promise<GameDTO[]> {
      console.log("token voilà:", token);
      try {
        const response = await axios.get(`${REST_API_URL}/game/list`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
    console.log(error);
    return [];}
  }

    async addGame(addGame: any, token: String): Promise<GameDTO | undefined> {
      const name = await axios.post(`${REST_API_URL}/game/create`,
        addGame, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (name) {
        console.log(name);
        return addGame;
      }
      return undefined;
    }

}
