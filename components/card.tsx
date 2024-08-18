"use client"
import React, {CSSProperties} from "react";
import {Card} from "@/lib/types/card.type";
import {useMultiplayerService} from "@/services/multiplayer.service";
import {ClientEvent} from "@/lib/types/event.type";

interface CardComponentProps {
    card: Card,
    roomId: string,
    visible: boolean,
    disabled: boolean
}

export default function CardComponent({card, roomId, visible, disabled}: CardComponentProps) {
    const {emit} = useMultiplayerService()
    const {id, title, description, value, color, descColor} = card

    function onPlay(): void {
        emit({
            type: ClientEvent.CARD_PLAYED,
            data: {
                card, roomId
            }
        })
    }

    const styles: CSSProperties = {
        pointerEvents: visible && !disabled ? "all" : "none",
        // transform: size === "normal" ? "scale(1)" : "scale(0.5)",
        // position: size === "normal" ? "relative" : "absolute",
        // top: discardIndex !== undefined ? `${20 * discardIndex}px` : "0",
    };

    const cardInnerStyles: CSSProperties = {
        // display: opponent ? "none" : "flex",
        cursor: visible && !disabled ? "pointer" : "default",
        // flexDirection: "column",
    };

    if (!visible) {
        return (
            <article
                className="card-bg flex flex-col bg-white w-[205px] min-h-[250px] rounded-lg overflow-hidden shadow-sm hover:shadow-lg border-2 border-slate-100"></article>
        )
    }

    return (
        <article
            id={id}
            style={styles}
            onClick={onPlay}
            className="card-bg flex flex-col bg-white w-[205px] min-h-[250px] rounded-lg overflow-hidden shadow-sm hover:shadow-lg border-2 border-slate-100 hover:border-yellow-400"
        >
            <div
                className="flex-col min-h-[250px]"
                style={cardInnerStyles}
            >
                <div
                    className="relative bg-white pb-[0.3rem] pt-2 pl-[3rem] font-bold"
                    style={{color: color}}
                >
                    <span
                        className="absolute bg-white text-[2rem] top-0 left-[-5px] rounded-br-lg w-[50px] h-[50px] flex items-center justify-center z-[2]">
                        {value}
                    </span>
                    <span className="relative text-[1.2rem] z-[2] leading-none">
                        {title}
                    </span>
                </div>
                <div
                    className="flex-1 h-full p-4 uppercase font-bold text-center leading-none"
                    style={{backgroundColor: color}}
                >
                    <p style={{color: descColor}}>{description}</p>
                </div>
            </div>
        </article>
    );
};