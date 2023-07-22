import axios from 'axios'
import {GroupDTO} from "../dto/Groupe.dto";

const REST_API_URL = 'https://app-turnmasterapi-230715140732.azurewebsites.net/api';

export class GroupeService {
    static async getGroupe(groupeData: GroupDTO): Promise<GroupDTO> {
        try {
            const response = await axios.get(`${REST_API_URL}/chat/group`, groupeData);
            return response.data as GroupDTO;
        } catch (error) {
            console.log(error);
            throw error; // Laisser le traitement des erreurs à l'appelant du service
        }
    }
}

