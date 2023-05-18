import {Game} from "../interfaces/Game.Interface";

export default class GameService {
    private readonly baseUrl: string;

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
}
