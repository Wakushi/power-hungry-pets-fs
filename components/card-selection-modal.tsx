import {availableCards} from "@/lib/data/card-data";
import CardComponent from "@/components/card";

export default function CardSelectionModal({roomId}: { roomId: string }) {
    return (
        <div
            className="absolute top-0 left-0 h-full w-full bg-black-modal flex flex-wrap justify-center items-center z-[4]"
        >
            <div className="flex flex-wrap justify-center items-center gap-4 scale-50">
                {availableCards.map(card =>
                    <CardComponent
                        key={card.value}
                        card={card}
                        roomId={roomId}
                        visible={true}
                        disabled={false}
                    />
                )}
            </div>
        </div>
    )
}