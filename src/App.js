import logo from './logo.svg';
import './App.css';
import FeatureFlagWrapper, {FeatureFlagProviderContext} from "./FeatureFlagWrapper";
import {useContext, useEffect, useState} from "react";

const App = ({featureFlagOpts}) => {
    console.log("APP MOUNT");

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
                <p aria-label={"default-text"} style={textGreen ? {color: 'green'} : {color: 'white'}}>
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
        <FeatureFlagWrapper opts={featureFlagOpts}>
            <OurApp/>
        </FeatureFlagWrapper>
    );
}

export default App;
