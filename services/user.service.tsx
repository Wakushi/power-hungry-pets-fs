"use client";

import {createContext, ReactNode, useContext, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {User} from "@/lib/types/user.type";

interface UserServiceProps {
    user: User | null;
    setUser: (user: User) => void;
    createUser: (name: string) => User;
}

const UserContext = createContext<UserServiceProps>({
    user: null,
    setUser: () => {
    },
    createUser: () => ({id: "", name: ""}),
});

interface UserProviderProps {
    children: ReactNode;
}

export function UserServiceProvider({children}: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);

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