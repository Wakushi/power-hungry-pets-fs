"use client";
import {useUser} from "@/services/user.service";
import {Player} from "@/lib/types/player.type";
import BackButton from "@/components/back-button";
import CardComponent from "@/components/card";

export default function GamePage() {
    const {room, user} = useUser();

    function isClientPlayer(playerId: string): boolean {
        return playerId === user?.id
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
            <div className="flex flex-col gap-8 w-full max-w-5xl">
                {opponents.map((player) => (
                    <PlayerMat key={player.id} player={player} isCurrentUser={isClientPlayer(player.id)}/>
                ))}
            </div>
            <PlayerMat key={clientPlayer.id} player={clientPlayer} isCurrentUser={true}/>
        </main>
    );
}

interface PlayerMatProps {
    player: Player;
    isCurrentUser: boolean;
}

function PlayerMat({player, isCurrentUser}: PlayerMatProps) {
    return (
        <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center min-w-[500px]">
            <h2 className="absolute top-5 right-5 font-bold mb-4">{isCurrentUser ? 'You' : player.name}</h2>
            <div className="flex flex-wrap justify-center gap-2">
                {player.hand.map((card) => (
                    <CardComponent key={card.id} card={card} visible={isCurrentUser}/>
                ))}
            </div>
        </div>
    );
}