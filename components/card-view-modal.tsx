"use client"
import React, {useState} from "react";
import {CardType} from "@/lib/types/card.type";
import CardComponent from "@/components/card";
import {Room} from "@/lib/types/room.type";
import {useMultiplayerService} from "@/services/multiplayer.service";
import {ClientEvent} from "@/lib/types/event.type";
import {useUser} from "@/services/user.service";

type CardViewModalProps = {
    room: Room
};

export default function CardViewModal({room}: CardViewModalProps) {
    const [cardIndex, setCardIndex] = useState<number>(1);
    const {emit} = useMultiplayerService()
    const {setShowCardViewModal} = useUser()

    function onValidateCardIndex(): void {
        setShowCardViewModal(false)
        emit({
            type: ClientEvent.INSERT_CARD,
            data: {
                roomId: room.id,
                cardIndex: cardIndex - 1
            }
        })
    }

    function onSwitch(): void {
        setShowCardViewModal(false)
        emit({
            type: ClientEvent.SWITCH_CARD,
            data: {
                roomId: room.id,
                switch: true
            }
        })
    }

    function onLeave(): void {
        setShowCardViewModal(false)
        emit({
            type: ClientEvent.SWITCH_CARD,
            data: {
                roomId: room.id,
                switch: false
            }
        })
    }

    const {game} = room

    if (!game) {
        throw new Error('Game not found for card view')
    }

    const {cardShown, playedCardValue} = game._cardViewContext

    return (
        <div
            className="absolute top-0 left-0 h-full w-full bg-black-modal flex justify-center items-center z-[4]"
        >
            <div className="flex flex-col gap-4">
                <div
                    className="flex flex-wrap justify-center gap-4"
                >
                    <CardComponent card={cardShown} roomId={room.id} visible={true} disabled={true}/>
                </div>

                <div>
                    {playedCardValue === CardType.MOUSE_TRAPPER && (
                        <div
                            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
                            <label htmlFor="newCardIndex">Choose where to put this card ? (1
                                being the top of the
                                pile)</label>
                            <input
                                className="shadow-lg p-4 border-b-4 text-black border-b-sky-800 rounded max-w-[100px]"
                                type="number"
                                min="1"
                                max={room.game?._deck._cards?.length}
                                value={cardIndex}
                                onChange={(e) => setCardIndex(+e.target.value)}
                            />
                            <button
                                className="bg-sky-800 text-white font-semibold rounded-lg py-2 px-4 margin-auto hover:text-sky-800 hover:bg-white"
                                onClick={onValidateCardIndex}
                            >
                                Validate
                            </button>
                        </div>
                    )}

                    {playedCardValue === CardType.DOGGY_GRAVE_DIGGER && (
                        <div
                            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
                            <p>Switch your card or leave it?</p>
                            <div className="flex items-center gap-4">
                                <button
                                    className="bg-sky-800 text-white font-semibold rounded-lg py-2 px-4 margin-auto hover:text-sky-800 hover:bg-white"
                                    onClick={onSwitch}
                                >
                                    Switch
                                </button>
                                <button
                                    className="bg-sky-800 text-white font-semibold rounded-lg py-2 px-4 margin-auto hover:text-sky-800 hover:bg-white"
                                    onClick={onLeave}
                                >
                                    Leave
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};
