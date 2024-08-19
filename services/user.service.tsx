"use client";

import {createContext, ReactNode, useContext, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {User} from "@/lib/types/user.type";
import {Room} from "@/lib/types/room.type";

interface UserServiceProps {
    user: User | null;
    setUser: (user: User) => void;
    createUser: (name: string) => User;
    room: Room | null;
    setRoom: (room: Room) => void
    showPlayerSelectionModal: boolean;
    setShowPlayerSelectionModal: (show: boolean) => void
    showCardSelectionModal: boolean;
    setShowCardSelectionModal: (show: boolean) => void
}

const UserContext = createContext<UserServiceProps>({
    user: null,
    setUser: () => {
    },
    createUser: () => ({id: "", name: ""}),
    room: null,
    setRoom: () => null,
    showPlayerSelectionModal: false,
    setShowPlayerSelectionModal: () => {
    },
    showCardSelectionModal: false,
    setShowCardSelectionModal: () => {
    }
});

interface UserProviderProps {
    children: ReactNode;
}

export function UserServiceProvider({children}: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [room, setRoom] = useState<Room | null>(null)

    const [showPlayerSelectionModal, setShowPlayerSelectionModal] = useState<boolean>(false)
    const [showCardSelectionModal, setShowCardSelectionModal] = useState<boolean>(false)


    function createUser(name: string): User {
        const id = uuidv4();
        const newUser = {id, name};
        setUser(newUser);
        return newUser;
    }

    const contextValue = {
        user,
        setUser,
        createUser,
        room,
        setRoom,
        showPlayerSelectionModal,
        setShowPlayerSelectionModal,
        showCardSelectionModal,
        setShowCardSelectionModal
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext);
}