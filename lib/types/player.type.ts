import {Card} from "@/lib/types/card.type";

export type Player = {
    id: string
    name: string
    hand: Card[]
    discards: Card[]
    eliminated: boolean
    protected: boolean
}