import Link from "next/link";
import {Player} from "@/lib/types/player.type";

export default function GameOverModal({winner, hasClientWon}: { winner: Player, hasClientWon: boolean }) {
    return (<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white z-50">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
            <h2 className="text-4xl font-bold mb-6">Game Over</h2>
            <p className="text-xl mb-8">{hasClientWon ? "You" : winner.name} won !</p>
            <div className="flex justify-center gap-4">
                <Link
                    href="/"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition duration-200"
                >
                    Back to menu
                </Link>
            </div>
        </div>
    </div>)
}