"use client";
import {useUser} from "@/services/user.service";
import {FaCrown} from "react-icons/fa";
import {useMultiplayerService} from "@/services/multiplayer.service";
import {ClientEvent} from "@/lib/types/event.type";
import BackButton from "@/components/back-button";

export default function RoomPage() {
    const {user, room} = useUser();
    const {emit} = useMultiplayerService()

    function isAdmin(userId: string): boolean {
        return userId === room?.adminUserId
    }

    function startGame(): void {
        emit({
            type: ClientEvent.START_GAME,
            data: room
        })
    }

    if (!user) {
        return (
            <main className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                <p className="text-xl font-semibold mb-4">Something went wrong...</p>
                <BackButton/>
            </main>
        );
    }

    if (!room) {
        return (
            <main className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                <p className="text-xl font-semibold mb-4">Room not found...</p>
                <BackButton/>
            </main>
        );
    }

    const {id, users} = room;

    return (
        <main
            className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <BackButton/>
            <h2 className="text-3xl font-bold mb-8">Room ID #{id}</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-2xl font-semibold mb-4 text-center">Players</h3>
                <div className="space-y-4">
                    {users.map(({id, name}) => (
                        <article
                            key={id}
                            className="flex items-center justify-between p-3 bg-gray-700 rounded-md shadow-md"
                        >
                            <span className="text-lg font-medium">{name}</span>
                            <span className="text-sm text-gray-400">ID: {id}</span>
                            {isAdmin(id) && <FaCrown className="text-amber-300"/>}
                        </article>
                    ))}
                </div>
            </div>
            {isAdmin(user?.id) &&
                <button onClick={startGame}
                        className="mt-8 px-6 py-3 bg-green-500 rounded-full hover:bg-green-600 transition duration-200">
                    Start Game
                </button>}
        </main>
    );
}