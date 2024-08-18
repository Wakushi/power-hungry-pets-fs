"use client"
import {GameEvent} from "../lib/types/event.type";
import {createContext, ReactNode, useContext, useEffect, useState} from "react"
import {useEventService} from "@/services/event.service";

interface MultiplayerServiceProviderProps {
    children: ReactNode
}

interface MultiplayerServiceProps {
    emit: (event: GameEvent) => void
}

const MultiplayerService = createContext<MultiplayerServiceProps>({
    emit: () => {
    }
})

export default function MultiplayerServiceProvider({children}: MultiplayerServiceProviderProps) {

    const [socket, setSocket] = useState<WebSocket | null>(null)
    const {dispatch} = useEventService()

    useEffect(() => {
        if (!socket) {
            initSocket()
        }
    }, [])


    function initSocket() {
        const newSocket = new WebSocket("ws://localhost:3000")

        newSocket.addEventListener("open", () => {
            console.log("Connected to WS Server")
        })

        newSocket.addEventListener("message", async (message) => {
            if (message.data instanceof Blob) {
                const text = await message.data.text()
                dispatch(JSON.parse(text))
                return
            }

            dispatch(JSON.parse(message.data))
        })

        setSocket(newSocket)
    }

    function emit(event: GameEvent): void {
        if (!socket) return
        socket.send(JSON.stringify(event))
    }

    const context = {emit}

    return (
        <MultiplayerService.Provider value={context}>
            {children}
        </MultiplayerService.Provider>
    )
}

export function useMultiplayerService() {
    return useContext(MultiplayerService);
}
