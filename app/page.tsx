"use client";
import {useEffect, useState} from "react";
import {ClientEvent, LocalEvent} from "@/lib/types/event.type";
import {useMultiplayerService} from "@/services/multiplayer.service";
import {useUser} from "@/services/user.service";

export default function Home() {
    const {createUser} = useUser();
    const {emit} = useMultiplayerService();

    useEffect(() => {
        document.addEventListener(LocalEvent.ROOM_NOT_FOUND, (event: any) => {
            setError("Couldn't find room #" + event.detail)
        })
    }, [])

    const [userName, setUserName] = useState<string>("");
    const [roomCode, setRoomCode] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    function createRoom(): void {
        if (!userName) {
            alert('Please enter a name!');
            return;
        }

        const user = createUser(userName);

        emit({
            type: ClientEvent.CREATE_ROOM,
            data: user,
        });
    }

    function joinRoom(): void {
        if (!roomCode) {
            alert('Please enter a room code!');
            return;
        }

        if (!userName) {
            alert('Please enter a name!');
            return;
        }

        setLoading(true)

        const user = createUser(userName);

        emit({
            type: ClientEvent.JOIN_ROOM,
            data: {
                user,
                roomCode
            }
        })
    }

    return (
        <main
            className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <h1 className="text-5xl sm:text-7xl uppercase font-extrabold mb-12">Power Hungry Pets</h1>
            <div className="flex flex-col gap-6 bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                <label htmlFor="username" className="text-lg font-medium">Name</label>
                <input
                    className="bg-gray-700 text-white border-2 border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-400"
                    id="username"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label htmlFor="roomCode" className="text-lg font-medium">Room Code</label>
                <input
                    className="bg-gray-700 text-white border-2 border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-400"
                    id="roomCode"
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                />
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition duration-200"
                        onClick={createRoom}
                    >
                        Create a Room
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition duration-200"
                        onClick={joinRoom}
                    >
                        Join a Room
                    </button>
                </div>
            </div>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="flex flex-col gap-4 items-center justify-center bg-gray-800 p-[5rem] rounded-lg shadow-lg">
                        {!error && <div
                            className="loader ease-linear rounded-full border-8 border-t-8 border-indigo-500 h-24 w-24 mb-4"
                        ></div>}
                        <p className="text-lg font-medium">{error ? error : `Searching for room #${roomCode}...`}</p>
                        <button onClick={() => {
                            setLoading(false)
                            setError("")
                        }}
                                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full transition duration-200">Close
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}