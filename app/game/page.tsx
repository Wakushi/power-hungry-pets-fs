"use client";
import {Player} from "@/lib/types/player.type";
import {useUser} from "@/services/user.service";
import BackButton from "@/components/back-button";
import PlayerMat from "@/components/player-mat";
import GameOverModal from "@/components/game-over-modal";
import CardViewModal from "@/components/card-view-modal";
import PlayerSelectionModal from "@/components/player-selection-modal";
import CardSelectionModal from "@/components/card-selection-modal";

export default function GamePage() {
    const {room, user, showPlayerSelectionModal, showCardSelectionModal, showCardViewModal} = useUser();

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
            <button
                className="cursor-pointer absolute top-5 right-5 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200 z-[99]"
                onClick={() => console.log('Room: ', room)}
            >
                Debug
            </button>
            <h2 className="text-2xl font-bold">{isClientPlayerTurn() ? 'Your turn' : `${getActivePlayer().name}'s turn`}</h2>
            <div className="flex flex-col gap-8 w-full max-w-5xl">
                {opponents.map((player) => (
                    <PlayerMat
                        key={player.id}
                        player={player}
                        roomId={room.id}
                        isCurrentUser={isClientPlayer(player.id)}
                        isCurrentUserTurn={isClientPlayerTurn()}
                        playerSelectionMode={showPlayerSelectionModal}
                    />
                ))}
            </div>
            <PlayerMat
                key={clientPlayer.id}
                player={clientPlayer}
                roomId={room.id}
                isCurrentUser={true}
                isCurrentUserTurn={isClientPlayerTurn()}
            />
            {showPlayerSelectionModal && <PlayerSelectionModal/>}
            {showCardSelectionModal && <CardSelectionModal roomId={room.id}/>}
            {showCardViewModal && <CardViewModal room={room}/>}
            {game?._gameOver &&
                <GameOverModal winner={game._lastWinner} hasClientWon={game._lastWinner.id === user.id}/>}
        </main>
    );
}


