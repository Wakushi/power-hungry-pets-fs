import {Deck} from "@/lib/types/deck.type";
import {Player} from "@/lib/types/player.type";
import {Card, CardType} from "@/lib/types/card.type";

export type Game = {
    _deck: Deck
    _players: Player[]
    _activePlayerId: string
    _lastWinner: Player
    _gameOver: boolean
    _cardViewContext: {
        playedCardValue: CardType,
        cardShown: Card
    }
}