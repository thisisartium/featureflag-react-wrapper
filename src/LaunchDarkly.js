import LDClient from "launchdarkly-js-client-sdk";

const launchDarkly = (clientId, userId) => {
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
                client.on('ready', () => {
                    try {
                        ourUpdater();
                    } catch (e) {
                        console.log("LAUNCHDARKLY READY FAILED", e)
                    }
                });

                client.on('change', () => {
                    try {
                        ourUpdater();
                    } catch (e) {
                        console.log("LAUNCHDARKLY CHANGE FAILED", e);
                    }
                });
                eventsRegistered = true;
            }
        },
        close: () => {
            return client.flush(function () {
                client.close();
            });
        }
    };
}

export default launchDarkly;