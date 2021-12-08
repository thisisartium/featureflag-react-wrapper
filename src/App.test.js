import {act, render, screen} from '@testing-library/react';
import App from './App';
import testFeatureFlags from "./TestFeatureFlags";

describe('<App>', () => {
    const defaultFlags = {"green-text": true}

    test('renders learn react link as green when feature flag true', () => {
        const {opts} = testFeatureFlags({defaultFlags});

        render(<App featureFlagOpts={opts}/>);
        const linkElement = screen.getByText(/learn react/i);
        expect(linkElement).toBeInTheDocument();

        const defaultText = screen.getByLabelText("default-text");
        expect(defaultText).toHaveStyle({color: "green"})
    });

    test('renders learn react link as white when feature flag false', async () => {
        const {opts, updateFlag} = testFeatureFlags({defaultFlags});
        let component;

        await act(async () => {
            component =
                render(<App featureFlagOpts={opts}/>);
            updateFlag("green-text", false);
        });

        const defaultText = await component.getByLabelText("default-text");
        expect(defaultText).toHaveStyle({color: "white"})
    });
});
