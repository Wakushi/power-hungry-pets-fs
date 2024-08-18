"use client"
import {createContext, ReactNode, useContext, useEffect} from "react"
import {GameEvent} from "../lib/types/event.type";
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

    let socket: WebSocket
    const {dispatch} = useEventService()

    useEffect(() => {
        if (!socket) {
            initSocket()
        }
    }, [])


    function initSocket() {
        socket = new WebSocket("ws://localhost:3000")

        socket.addEventListener("open", () => {
            console.log("Connected to WS Server")
        })

        socket.addEventListener("message", async (message) => {
            if (message.data instanceof Blob) {
                const text = await message.data.text()
                dispatch(JSON.parse(text))
                return
            }

            dispatch(JSON.parse(message.data))
        })
    }

    function emit(event: GameEvent): void {
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
