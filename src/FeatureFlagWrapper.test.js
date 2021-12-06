import {act, render, screen} from '@testing-library/react';
import {useContext, useEffect, useState} from 'react';
import FeatureFlagWrapper, {FeatureFlagProviderContext} from "./FeatureFlagWrapper";

const TestComponent = ({flagName}) => {
    const {flags} = useContext(FeatureFlagProviderContext);
    const [flagValue, setFlagValue] = useState(flags[flagName]);
    useEffect(() => {
        setFlagValue(flags[flagName]);
    }, [flags]);

    return (
        <div>Hello, {flagValue}</div>
    );
}

const testFeatureFlags = (close) => {
    const flagValues = {personName: "bob", petName: "fluffy"};
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

test('renders learn react link', () => {
    const {opts} = testFeatureFlags();

    render(<FeatureFlagWrapper opts={opts}>
        <TestComponent flagName={"personName"}/>
        <TestComponent flagName={"petName"}/>
    </FeatureFlagWrapper>);
    expect(screen.getByText(/Hello, bob/i)).toBeInTheDocument();
    expect(screen.getByText(/Hello, fluffy/i)).toBeInTheDocument();
});

test('renders different value on update out of band', async () => {
    let closedCount = 0;
    const {opts, updateFlag} = testFeatureFlags(() => closedCount++);

    let component;
    await act(async () => {
        component = render(<FeatureFlagWrapper opts={opts}>
            <TestComponent flagName={"personName"}/>
            <TestComponent flagName={"petName"}/>
        </FeatureFlagWrapper>);
        updateFlag("personName", "larry");
    });

    expect(await component.findByText(/Hello, larry/i)).toBeInTheDocument();
    expect(closedCount).toBe(0);

    component.unmount();
    expect(closedCount).toBe(1);
});


test('closes on unmount', async () => {
    let closed = false;
    const {opts} = testFeatureFlags(() => closed = true);

    const {unmount} = render(<FeatureFlagWrapper opts={opts}>
        <TestComponent flagName={"personName"}/>
    </FeatureFlagWrapper>);

    expect(screen.getByText(/Hello, bob/i)).toBeInTheDocument();

    unmount();
    expect(closed).toBe(true);
});