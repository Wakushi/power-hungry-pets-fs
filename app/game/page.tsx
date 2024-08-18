"use client";
import {useUser} from "@/services/user.service";
import {Player} from "@/lib/types/player.type";
import BackButton from "@/components/back-button";
import CardComponent from "@/components/card";
import {clsx} from "clsx";

export default function GamePage() {
    const {room, user} = useUser();

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

    const opponents = room.game._players.filter(p => !isClientPlayer(p.id))
    const [clientPlayer] = room.game._players.filter(p => isClientPlayer(p.id))

    return (
        <main
            className="flex flex-col gap-8 items-center justify-center h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4">
            <BackButton/>
            <button
                className="cursor-pointer absolute top-5 right-5 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                onClick={() => console.log('Room: ', room)}
            >
                Debug
            </button>
            <h2 className="text-2xl font-bold">{isClientPlayerTurn() ? 'Your turn' : `${getActivePlayer().name}'s turn`}</h2>
            <div className="flex flex-col gap-8 w-full max-w-5xl">
                {opponents.map((player) => (
                    <PlayerMat key={player.id} player={player} isCurrentUser={isClientPlayer(player.id)}
                               isCurrentUserTurn={isClientPlayerTurn()}/>
                ))}
            </div>
            <PlayerMat key={clientPlayer.id} player={clientPlayer} isCurrentUser={true}
                       isCurrentUserTurn={isClientPlayerTurn()}/>
        </main>
    );
}

interface PlayerMatProps {
    player: Player;
    isCurrentUser: boolean;
    isCurrentUserTurn: boolean
}

function PlayerMat({player, isCurrentUser, isCurrentUserTurn}: PlayerMatProps) {
    return (
        <div
            className={clsx("relative bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center min-w-[500px] w-full", {
                "opacity-30": isCurrentUser && !isCurrentUserTurn,
            })}>
            <h2 className="absolute top-5 right-5 font-bold mb-4">{isCurrentUser ? 'You' : player.name}</h2>
            <div className="flex flex-wrap justify-center gap-2">
                {player.hand.map((card) => (
                    <CardComponent key={card.id} card={card} disabled={!isCurrentUserTurn} visible={isCurrentUser}/>
                ))}
            </div>
        </div>
    );
}