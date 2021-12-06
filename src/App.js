import logo from './logo.svg';
import './App.css';
import FeatureFlagWrapper, {FeatureFlagProviderContext} from "./FeatureFlagWrapper";
import * as LDClient from 'launchdarkly-js-client-sdk';
import {useContext, useEffect, useState} from "react";

function launchDarkly(clientId, userId) {
    const userIdBase = {
        key: userId ? userId : 'notLoggedIn',
    };

    const client = LDClient.initialize(
        clientId,
        userIdBase,
    );

    let eventsRegistered = false;
    let ourUpdater;

    return {
        flagValues: () => client ? client.allFlags() : {},
        receiveFlagUpdater: (updater) => {
            ourUpdater = updater;
            if (!eventsRegistered) {
                console.log("CLIENT INITIALIZED");
                client.on('ready', () => {
                    try {
                        console.log("READY");
                        ourUpdater();
                    } catch (e) {
                        console.log("READY FAILED", e)
                    }
                });

                client.on('change', () => {
                    try {
                        console.log("CHANGE");
                        ourUpdater();
                    } catch (e) {
                        console.log("CHANGE FAILED", e);
                    }
                });
                eventsRegistered = true;
            } else {
                console.log("CLIENT ALREADY INITIALIZED");
            }
        },
        close: () => {
            console.log("CLOSE");
            return client.flush(function () {
                client.close();
            });
        }
    };
}


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
