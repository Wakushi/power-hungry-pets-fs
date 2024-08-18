import {User} from "./user.type";
import {Game} from "@/lib/types/game.type";

export type Room = {
    id: string
    adminUserId: string
    users: User[]
    game?: Game
}