import {Deck} from "@/lib/types/deck.type";
import {Player} from "@/lib/types/player.type";

export type Game = {
    _deck: Deck
    _players: Player[]
}