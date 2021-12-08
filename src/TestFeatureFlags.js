const testFeatureFlags = ({defaultFlags, close}) => {
    const flagValues = {...defaultFlags}
    let flagsUpdated;
    const receiveFlagUpdater = (newUpdater) => {
        flagsUpdated = newUpdater;
    }

    const opts = {
        flagValues: () => flagValues,
        receiveFlagUpdater: receiveFlagUpdater,
        close: close
    };

    return {
        opts: opts, updateFlag: (n, v) => {
            flagValues[n] = v;
            flagsUpdated();
        }
    }
};

export default testFeatureFlags;