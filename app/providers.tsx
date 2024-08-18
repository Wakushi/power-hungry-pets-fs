import {ReactNode} from "react";
import MultiplayerServiceProvider from "@/services/multiplayer.service";
import EventServiceProvider from "@/services/event.service";
import {UserServiceProvider} from "@/services/user.service";

export default function Providers({children}: { children: ReactNode }) {
    return (
        <UserServiceProvider>
            <EventServiceProvider>
                <MultiplayerServiceProvider>
                    {children}
                </MultiplayerServiceProvider>
            </EventServiceProvider>
        </UserServiceProvider>
    )
}