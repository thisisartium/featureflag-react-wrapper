import {act, render, screen} from '@testing-library/react';
import {useContext, useEffect, useState} from 'react';
import FeatureFlagWrapper, {FeatureFlagProviderContext} from "./FeatureFlagWrapper";
import testFeatureFlags from "./TestFeatureFlags";

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

const defaultFlags = {personName: "bob", petName: "fluffy"};

test('renders multiple TestComponents', () => {
    const {opts} = testFeatureFlags({defaultFlags});

    render(<FeatureFlagWrapper opts={opts}>
        <TestComponent flagName={"personName"}/>
        <TestComponent flagName={"petName"}/>
    </FeatureFlagWrapper>);
    expect(screen.getByText(/Hello, bob/i)).toBeInTheDocument();
    expect(screen.getByText(/Hello, fluffy/i)).toBeInTheDocument();
});

test('renders different value on update out of band', async () => {
    let closedCount = 0;
    const close = () => closedCount++;

    const {opts, updateFlag} = testFeatureFlags({defaultFlags, close});

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
    const close = () => closed = true;

    const {opts} = testFeatureFlags({defaultFlags, close});

    const {unmount} = render(<FeatureFlagWrapper opts={opts}>
        <TestComponent flagName={"personName"}/>
    </FeatureFlagWrapper>);

    expect(screen.getByText(/Hello, bob/i)).toBeInTheDocument();

    unmount();
    expect(closed).toBe(true);
});