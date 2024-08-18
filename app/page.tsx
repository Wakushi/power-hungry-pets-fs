"use client"
import {useState} from "react";
import {ClientEvent} from "@/lib/types/event.type";
import {useMultiplayerService} from "@/services/multiplayer.service";
import {useUser} from "@/services/user.service";

export default function Home() {
    const {createUser} = useUser()
    const {emit} = useMultiplayerService()

    const [userName, setUserName] = useState<string>("")
    const [roomCode, setRoomCode] = useState<string>("")

    function createRoom(): void {
        if (!userName) {
            alert('Please enter a name !')
            return
        }

        const user = createUser(userName)

        emit({
            type: ClientEvent.CREATE_ROOM,
            data: user,
        })
    }

    function joinRoom(): void {
        if (!roomCode) {
            alert('Please enter a room code !')
            return
        }

        if (!userName) {
            alert('Please enter a name !')
            return
        }

        setRoomCode("BER")

        console.log('Room code: ', roomCode)
    }

    return (
        <main className="flex flex-col items-center justify-center h-[100vh] gap-8">
            <h1 className="text-7xl uppercase font-extrabold">Power Hungry Pets</h1>
            <div className="flex flex-col gap-4 max-w-[500px]">
                <label htmlFor="username">Name</label>
                <input className="border-b-2 border-b-blue-800 shadow px-4 py-2 rounded" id="username" type="text"
                       value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <label htmlFor="roomCode">Room code</label>
                <input className="border-b-2 border-b-blue-800 shadow px-4 py-2 rounded" id="roomCode" type="text"
                       value={roomCode} onChange={(e) => setRoomCode(e.target.value)}/>
                <div className="flex items-center justify-center gap-4">
                    <button className="rounded bg-blue-800 text-white px-4 py-2" onClick={createRoom}>Create a room
                    </button>
                    <button className="rounded bg-blue-800 text-white px-4 py-2" onClick={joinRoom}>Join a room</button>
                </div>
            </div>
        </main>)
}