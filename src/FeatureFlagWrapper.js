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

    const [flags, setFlags] = useState(flagValues());

    useEffect(() => {
        const updateFlags = () => {
            let newValues = flagValues();
            console.log("UPDATE_FLAGS", newValues);
            setFlags(newValues);
        };

        receiveFlagUpdater(updateFlags);
        return () => {
            console.log("UNMOUNTING");
        };

    }, [setFlags]);

    return (
        <FeatureFlagProviderContext.Provider
            value={{flags: flags}}
        >
            {children}
        </FeatureFlagProviderContext.Provider>
    );
}

export default FeatureFlagWrapper;