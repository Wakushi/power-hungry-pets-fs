"use client"
import {GameEvent, LocalEvent, ServerEvent} from "../lib/types/event.type";
import {createContext, ReactNode, useContext} from "react"
import {useRouter} from "next/navigation";
import {useUser} from "@/services/user.service";

interface EventServiceProviderProps {
    children: ReactNode
}

interface EventServiceProps {
    dispatch: (event: GameEvent) => void
}

const EventService = createContext<EventServiceProps>({
    dispatch: () => {
    }
})

export default function EventServiceProvider({children}: EventServiceProviderProps) {
    const router = useRouter()
    const {setRoom} = useUser()

    function dispatch(event: GameEvent): void {
        switch (event.type) {
            case ServerEvent.ROOM_CREATED:
                setRoom(event.data)
                router.push('room')
                break

            case ServerEvent.ROOM_NOT_FOUND:
                document.dispatchEvent(
                    new CustomEvent(LocalEvent.ROOM_NOT_FOUND, {detail: event.data})
                )
                break

            case ServerEvent.ROOM_FOUND:
                setRoom(event.data)
                router.push('room')
                break

            case ServerEvent.GAME_STARTED:
                setRoom(event.data)
                router.push('game')
                break
        }
    }

    const context = {
        dispatch
    }

    return (
        <EventService.Provider value={context}>
            {children}
        </EventService.Provider>
    )
}

export function useEventService() {
    return useContext(EventService);
}
