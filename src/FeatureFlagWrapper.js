import {
    createContext,
    useState,
    useEffect,
} from 'react';

export const FeatureFlagProviderContext = createContext({
    flags: {},
});

const FeatureFlagWrapper = ({opts, children}) => {
    const flagValues = opts['flagValues'];
    const receiveFlagUpdater = opts['receiveFlagUpdater'];
    const close = opts['close'];

    const [flags, setFlags] = useState(flagValues());

    const updateFlags = () => {
        let newValues = flagValues();
        console.log("UPDATE_FLAGS", newValues);
        setFlags(newValues);
    };

    receiveFlagUpdater(updateFlags);

    useEffect(() => {
        return () => {
            if (typeof close === 'function') {
                close();
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