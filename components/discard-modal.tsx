import {Card} from "@/lib/types/card.type";
import CardComponent from "@/components/card";
import {IoClose} from "react-icons/io5";

interface DiscardModalProps {
    discard: Card[],
    setShowDiscard: (show: boolean) => void
    roomId: string
}

export default function DiscardModal({discard, setShowDiscard, roomId}: DiscardModalProps) {
    return (
        <div
            className="absolute top-0 left-0 h-full w-full bg-black-modal flex flex-wrap justify-center items-center z-[4]"
            onClick={() => setShowDiscard(false)}
        >
            <IoClose className="absolute top-5 right-5 text-white cursor-pointer opacity-70 hover:opacity-30 text-2xl"/>
            <h3 className="absolute top-5 uppercase font-bold text-white cursor-pointer opacity-70 hover:opacity-30 text-2xl">Discard</h3>
            <div className="flex flex-wrap justify-center items-center gap-4 scale-80 p-8">
                {discard.map(card =>
                    <CardComponent
                        key={'discard-' + card.id}
                        card={card}
                        roomId={roomId}
                        visible={true}
                        disabled={true}
                    />
                )}
            </div>
        </div>
    )
}