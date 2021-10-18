import { createContext, useState, useMemo } from 'react';

const StreamContext = createContext({
    stream: { loading: true, error: "" },
    setStreamParams: () => { },
});

function StreamContextProvider({ children }) {
    const [stream, setStreamParams] = useState({ loading: true, error: "" });

    const value = useMemo(
        () => ({ stream, setStreamParams: setStreamParams }),
        [stream]
    );

    return (
        <StreamContext.Provider value={value}>
            {children}
        </StreamContext.Provider>
    );
}

export { StreamContext, StreamContextProvider }


