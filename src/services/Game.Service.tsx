import axios from 'axios'

const GAMES_REST_API_URL = 'http://localhost:8080/api/game/list';

class GameService {

    getUsers(){
        return axios.get(GAMES_REST_API_URL);
    }
}

export default new GameService();
