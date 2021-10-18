import { createContext, useState, useMemo } from 'react';

const SocketContext = createContext({
    socket: null,
    setsocket: () => { },
});

function SocketContextProvider({ children }) {
    const [socket, setsocket] = useState(null);
    const value = useMemo(
        () => ({ socket, setsocket }),
        [socket]
    );

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
}

export { SocketContext, SocketContextProvider }


