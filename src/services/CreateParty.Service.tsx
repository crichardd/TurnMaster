import axios from "axios";
import { PartyDTO } from "../dto/CreateParty.dto";

export class PartyService {
    static async createParty(partyDTO: PartyDTO) {
      const response = await fetch('http://localhost:8080/api/party/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(partyDTO),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create party');
      }
  
      const party = await response.json();
      return party;
    }
}
  