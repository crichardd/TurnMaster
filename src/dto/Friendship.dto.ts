export interface FriendshipDTO {
    senderUser: string;
    receiverUser: string;
    status: FriendshipStatus;
    time: string; // ou vous pouvez utiliser le type `Date` à la place de `string` si vous préférez
}

export enum FriendshipStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    DECLINED = 'DECLINED',
    BLOCKED = 'BLOCKED',
}