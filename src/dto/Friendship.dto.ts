export interface FriendshipDTO {
    id: string;
    senderUsername: string;
    receiverUsername: string;
    status: FriendshipStatus;
    time: string; 
}

export enum FriendshipStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    DECLINED = 'DECLINED',
    BLOCKED = 'BLOCKED',
}