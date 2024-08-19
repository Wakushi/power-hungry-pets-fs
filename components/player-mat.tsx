"use client"
import {Player} from "@/lib/types/player.type";
import {clsx} from "clsx";
import CardComponent from "@/components/card";
import {useMultiplayerService} from "@/services/multiplayer.service";
import {ClientEvent} from "@/lib/types/event.type";

interface PlayerMatProps {
    player: Player;
    roomId: string
    isCurrentUser: boolean;
    isCurrentUserTurn: boolean
    playerSelectionMode?: boolean
}

export default function PlayerMat({
                                      player,
                                      roomId,
                                      isCurrentUser,
                                      isCurrentUserTurn,
                                      playerSelectionMode
                                  }: PlayerMatProps) {

    const {emit} = useMultiplayerService()

    function onSelectPlayer(): void {
        if (!playerSelectionMode) return

        emit({
            type: ClientEvent.PLAYER_SELECTED,
            data: {
                playerId: player.id,
                roomId
            }
        })
    }

    return (
        <div
            className={clsx("relative bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center min-w-[500px] w-full border-2 border-transparent", {
                "opacity-30": isCurrentUser && !isCurrentUserTurn,
                "z-[4]": !isCurrentUser,
                "cursor-pointer hover:border-2 hover:border-indigo-400": playerSelectionMode
            })}
            onClick={onSelectPlayer}
        >
            <h2 className="absolute top-5 right-5 font-bold mb-4">{isCurrentUser ? 'You' : player.name}</h2>
            <div className="flex flex-wrap justify-center gap-2">
                {player.hand.map((card) => (
                    <CardComponent key={card.id} card={card} roomId={roomId} disabled={!isCurrentUserTurn}
                                   visible={isCurrentUser}
                    />
                ))}
            </div>
        </div>
    );
}