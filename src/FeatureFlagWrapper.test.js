import {render, screen, waitFor} from '@testing-library/react';
import {useContext, useState, useEffect} from 'react';
import FeatureFlagWrapper, {FeatureFlagProviderContext} from "./FeatureFlagWrapper";

test('renders learn react link', async () => {
    const flagValues = {personName: "bob", petName: "fluffy"};
    let flagsUpdated;
    const receiveFlagUpdater = (newUpdater) => {
        flagsUpdated = newUpdater;
    }

    const opts = {
        flagValues: () => flagValues,
        receiveFlagUpdater: receiveFlagUpdater
    };

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

    render(<FeatureFlagWrapper opts={opts}>
        <TestComponent flagName={"personName"}/>
        <TestComponent flagName={"petName"}/>
    </FeatureFlagWrapper>);
    const person = screen.getByText(/Hello, bob/i);
    const pet = screen.getByText(/Hello, fluffy/i);
    expect(person).toBeInTheDocument();
    expect(pet).toBeInTheDocument();

    flagValues["personName"] = "larry";
    flagsUpdated();

    // await waitFor(() => {
    //     const person2 = screen.getByText(/Hello, larry/i);
    //     expect(person2).toBeInTheDocument();
    // });
});
