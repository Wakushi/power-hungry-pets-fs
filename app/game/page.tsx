"use client";
import {Player} from "@/lib/types/player.type";
import {useUser} from "@/services/user.service";
import BackButton from "@/components/back-button";
import PlayerMat from "@/components/player-mat";
import GameOverModal from "@/components/game-over-modal";
import CardViewModal from "@/components/card-view-modal";
import PlayerSelectionModal from "@/components/player-selection-modal";
import CardSelectionModal from "@/components/card-selection-modal";
import DiscardModal from "@/components/discard-modal";
import {Card} from "@/lib/types/card.type";
import {useState} from "react";

export default function GamePage() {
    const {room, user, showPlayerSelectionModal, showCardSelectionModal, showCardViewModal} = useUser();

    const [showDiscard, setShowDiscard] = useState<boolean>(false)
    const [shownPlayerDiscard, setShownPlayerDiscard] = useState<Card[]>([])

    function isClientPlayer(playerId: string): boolean {
        return playerId === user?.id
    }

    function isClientPlayerTurn(): boolean {
        return room?.game?._activePlayerId === user?.id
    }

    function getActivePlayer(): Player {
        const activePlayer = room?.game?._players.find(p => p.id === room?.game?._activePlayerId)

        if (!activePlayer) {
            throw new Error('Active player not found with id ' + room?.game?._activePlayerId)
        }

        return activePlayer
    }

    if (!room || !room.game || !user) {
        return (
            <main
                className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <BackButton/>
                <p className="text-xl font-semibold">No game found...</p>
            </main>
        );
    }

    const {game} = room

    const opponents = game._players.filter(p => !isClientPlayer(p.id))
    const [clientPlayer] = game._players.filter(p => isClientPlayer(p.id))

    return (
        <main
            className="relative flex flex-col gap-8 items-center justify-center h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4"
        >
            <BackButton/>
            <h2 className="text-2xl font-bold">{isClientPlayerTurn() ? 'Your turn' : `${getActivePlayer().name}'s turn`}</h2>
            <div className="flex items-center gap-8 w-full max-w-5xl">
                {opponents.map((player) => (
                    <PlayerMat
                        key={player.id}
                        player={player}
                        roomId={room.id}
                        isCurrentUser={isClientPlayer(player.id)}
                        isCurrentUserTurn={isClientPlayerTurn()}
                        playerSelectionMode={showPlayerSelectionModal}
                        onShowDiscard={() => {
                            setShownPlayerDiscard(player.discards)
                            setShowDiscard(true)
                        }}
                    />
                ))}
            </div>
            <PlayerMat
                key={clientPlayer.id}
                player={clientPlayer}
                roomId={room.id}
                isCurrentUser={true}
                isCurrentUserTurn={isClientPlayerTurn()}
                onShowDiscard={() => {
                    setShownPlayerDiscard(clientPlayer.discards)
                    setShowDiscard(true)
                }}
            />
            {showPlayerSelectionModal && <PlayerSelectionModal/>}
            {showCardSelectionModal && <CardSelectionModal roomId={room.id}/>}
            {showCardViewModal && <CardViewModal room={room}/>}
            {game?._gameOver &&
                <GameOverModal winner={game._lastWinner} hasClientWon={game._lastWinner.id === user.id}/>}
            {showDiscard &&
                <DiscardModal discard={shownPlayerDiscard} roomId={room.id} setShowDiscard={setShowDiscard}/>}
        </main>
    );
}


