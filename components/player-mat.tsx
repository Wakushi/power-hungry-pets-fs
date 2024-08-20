"use client"
import {Player} from "@/lib/types/player.type";
import {clsx} from "clsx";
import CardComponent from "@/components/card";
import {useMultiplayerService} from "@/services/multiplayer.service";
import {ClientEvent} from "@/lib/types/event.type";
import {useUser} from "@/services/user.service";
import {FaRegTrashAlt, FaSkull} from "react-icons/fa";
import {FaShieldCat} from "react-icons/fa6";

interface PlayerMatProps {
    player: Player;
    roomId: string
    isCurrentUser: boolean;
    isCurrentUserTurn: boolean
    playerSelectionMode?: boolean
    onShowDiscard: () => void
}

export default function PlayerMat({
                                      player,
                                      roomId,
                                      isCurrentUser,
                                      isCurrentUserTurn,
                                      playerSelectionMode,
                                      onShowDiscard
                                  }: PlayerMatProps) {

    const {emit} = useMultiplayerService()
    const {setShowPlayerSelectionModal} = useUser()

    function onSelectPlayer(): void {
        if (!playerSelectionMode || player.eliminated) return

        setShowPlayerSelectionModal(false)

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
                "opacity-30": isCurrentUser && !isCurrentUserTurn || player.eliminated,
                "z-[4]": !isCurrentUser,
                "cursor-pointer hover:border-2 hover:border-indigo-400": playerSelectionMode && !player.eliminated,
                "bg-pink-700": player.eliminated
            })}
            onClick={onSelectPlayer}
        >
            <h2 className="absolute top-5 right-5 font-bold mb-4">{isCurrentUser ? 'You' : player.name}</h2>

            {player.protected && <FaShieldCat className="absolute top-5 left-5 text-7xl text-emerald-500"/>}
            {player.eliminated && <FaSkull className="absolute top-5 left-5 text-7xl text-white"/>}
            <div className="flex flex-wrap justify-center gap-2">
                {player.hand.map((card) => (
                    <CardComponent key={card.id} card={card} roomId={roomId} disabled={!isCurrentUserTurn}
                                   visible={isCurrentUser}
                    />
                ))}
            </div>
            <FaRegTrashAlt className="absolute bottom-5 right-5 cursor-pointer opacity-70 hover:opacity-30"
                           onClick={onShowDiscard}/>
        </div>
    );
}

