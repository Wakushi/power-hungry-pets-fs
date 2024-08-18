"use client"
import {createContext, ReactNode, useContext} from "react"
import {useRouter} from "next/navigation";
import {GameEvent, ServerEvent} from "../lib/types/event.type";

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

    function dispatch(event: GameEvent): void {
        switch (event.type) {
            case ServerEvent.ROOM_CREATED:
                console.log("Room created event: ", event)
                router.push('room')
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
