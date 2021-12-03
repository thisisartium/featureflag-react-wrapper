import {createContext, useEffect, useState,} from 'react';

export const FeatureFlagProviderContext = createContext({
    flags: {},
});

const FeatureFlagWrapper = ({opts, children}) => {
    console.log("WRAPPER MOUNT");
    const flagValues = opts['flagValues'];
    const receiveFlagUpdater = opts['receiveFlagUpdater'];
    const close = opts['close'];

    const [flags, setFlags] = useState(flagValues());

    const updateFlags = () => {
        setFlags(flagValues());
        console.log("updateFlags");
    };

    receiveFlagUpdater(updateFlags);

    useEffect(() => {
        return () => {
            if (typeof close === 'function') {
                return close();
            }
        }
    });

    return (
        <FeatureFlagProviderContext.Provider
            value={{flags: flags}}
        >
            {children}
        </FeatureFlagProviderContext.Provider>
    );
}

export default FeatureFlagWrapper;