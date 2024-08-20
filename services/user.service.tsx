"use client";

import {createContext, ReactNode, useContext, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {User} from "@/lib/types/user.type";
import {Room} from "@/lib/types/room.type";

interface UserServiceProps {
    user: User | null;
    setUser: (user: User | ((prevUser: User | null) => User | null)) => void;
    createUser: (name: string) => User;
    room: Room | null;
    setRoom: (room: Room | ((prevRoom: Room | null) => Room | null)) => void;
    showPlayerSelectionModal: boolean;
    setShowPlayerSelectionModal: (show: boolean | ((prevShow: boolean) => boolean)) => void;
    showCardSelectionModal: boolean;
    setShowCardSelectionModal: (show: boolean | ((prevShow: boolean) => boolean)) => void;
    showCardViewModal: boolean;
    setShowCardViewModal: (show: boolean | ((prevShow: boolean) => boolean)) => void;
    fetchLocalUser: () => User | null
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
    },
    showCardViewModal: false,
    setShowCardViewModal: () => {
    },
    fetchLocalUser: () => null
});

interface UserProviderProps {
    children: ReactNode;
}

export function UserServiceProvider({children}: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [room, setRoom] = useState<Room | null>(null)

    const [showPlayerSelectionModal, setShowPlayerSelectionModal] = useState<boolean>(false)
    const [showCardSelectionModal, setShowCardSelectionModal] = useState<boolean>(false)
    const [showCardViewModal, setShowCardViewModal] = useState<boolean>(false)

    function createUser(name: string): User {
        if (user) return user

        const id = uuidv4();
        const newUser = {id, name};

        localSaveUser(newUser)
        setUser(newUser);
        return newUser;
    }

    function localSaveUser(user: User): void {
        localStorage.setItem('user', JSON.stringify(user))
    }

    function fetchLocalUser(): User | null {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
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
        setShowCardSelectionModal,
        showCardViewModal,
        setShowCardViewModal,
        fetchLocalUser
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