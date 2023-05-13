export class PartyDTO {
    public partyName: string;
    public creatorUsername: string;
    public numPlayers: number;
  
    constructor(partyName: string, creatorUsername: string, numPlayers: number) {
      this.partyName = partyName;
      this.creatorUsername = creatorUsername;
      this.numPlayers = numPlayers;
    }
  }
  