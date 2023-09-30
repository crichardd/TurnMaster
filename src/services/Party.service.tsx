import axios from 'axios'
import {PartyDTO} from "../dto/Party.dto";

const REST_API_URL = 'http://85.31.239.81:8080/api';

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