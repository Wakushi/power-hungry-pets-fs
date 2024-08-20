"use client"
import React, {useState} from "react";
import {CardType} from "@/lib/types/card.type";
import CardComponent from "@/components/card";
import {Room} from "@/lib/types/room.type";

type CardViewModalProps = {
    room: Room
};

export default function CardViewModal({room}: CardViewModalProps) {
    const [cardIndex, setCardIndex] = useState<number>(1);

    function onValidate(): void {
    }

    function onSwitch(): void {
    }

    function onLeave(): void {
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
                            className="flex flex-col items-center bg-white px-8 py-4 gap-4 rounded-2xl">
                            <label htmlFor="newCardIndex">Choose where to put this card ? (1 being the top of the
                                pile)</label>
                            <input
                                className="shadow-lg p-4 border-b-4 border-b-sky-800 rounded max-w-[100px]"
                                type="number"
                                min="1"
                                max={room.game?._deck._cards?.length}
                                value={cardIndex}
                                onChange={(e) => setCardIndex(+e.target.value)}
                            />
                            <button
                                className="bg-sky-800 text-white font-semibold rounded-lg py-2 px-4 margin-auto hover:text-sky-800 hover:bg-white"
                                onClick={onValidate}
                            >
                                Validate
                            </button>
                        </div>
                    )}

                    {playedCardValue === CardType.DOGGY_GRAVE_DIGGER && (
                        <div
                            className="flex flex-col items-center bg-white px-8 py-4 gap-4 rounded-2xl">
                            <p>Switch your card or leave it?</p>
                            <div>
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
