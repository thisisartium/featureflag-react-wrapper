import logo from './logo.svg';
import './App.css';
import FeatureFlagWrapper, {FeatureFlagProviderContext} from "./FeatureFlagWrapper";
import {useContext, useEffect, useState} from "react";
import launchDarkly from "./LaunchDarkly";

function App() {
    console.log("APP MOUNT");
    const ldOpts = launchDarkly(process.env.REACT_APP_LAUNCH_DARKLY_CLIENT_ID);

    const OurApp = () => {
        const flagName = "green-text";
        const {flags} = useContext(FeatureFlagProviderContext);
        const [textGreen, setTextGreen] = useState(flags[flagName]);
        console.log("FLAGS", textGreen, flags, flags[flagName]);

        useEffect(() => {
            setTextGreen(flags[flagName]);
        }, [flags]);

        return (<div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p style={textGreen ? {color: 'green'} : undefined}>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>)
    }

    return (
        <FeatureFlagWrapper opts={ldOpts}>
            <OurApp/>
        </FeatureFlagWrapper>
    );
}

export default App;
