import axios from 'axios'
import {GroupeDTO} from "../dto/Groupe.dto";

const REST_API_URL = 'https://app-turnmasterapi-230715140732.azurewebsites.net/api';

export class GroupeService {
    static async getGroupe(): Promise<GroupeDTO[]> {
        try {
            const response = await axios.get(`${REST_API_URL}/chat/group`);
            return response.data as GroupeDTO[];
        } catch (error) {
            console.log(error);
            throw error; 
        }
    }
}
