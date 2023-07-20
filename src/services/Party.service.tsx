import axios from 'axios'
import {PartyDTO} from "../dto/Party.dto";

const REST_API_URL = 'https://app-turnmasterapi-230715140732.azurewebsites.net/api';

export class PartyService {
    static async createParty(partyData: PartyDTO): Promise<PartyDTO> {
        try {
            const response = await axios.post(`${REST_API_URL}/party/create`, partyData);
            return response.data as PartyDTO;
        } catch (error) {
            console.log(error);
            throw error; // Laisser le traitement des erreurs à l'appelant du service
        }
    }
}