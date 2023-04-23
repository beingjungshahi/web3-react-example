import { useEffect, useState } from 'react';
import { hooks, metaMask } from '@/hooks/metaMask'

export default function ConnectButton() {
    const { useIsActive, useProvider } = hooks;
    const isActive = useIsActive()
    const provider = useProvider()
    const [error, setError] = useState(undefined)

    useEffect(() => {
        void metaMask.connectEagerly().catch(() => {
            console.debug('Failed to connect eagerly to metamask')
        })
    }, [])

    const handleConnectWallet = async () => {
        try {
            await metaMask.activate().then(() => setError(undefined))
                .catch(setError);
        } catch (ex) {
            console.error(ex);
        }
    };
    const handleDisconnectWallet = () => {
        if (metaMask?.deactivate) {
            void metaMask.deactivate();
        }
        metaMask.resetState();
    };

    return (
        <>
            <div>
                {isActive ? (
                    <button
                        type="submit"
                        onClick={handleDisconnectWallet}
                        className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Disconnect
                    </button>
                ) : (
                    <button
                        type="submit"
                        onClick={handleConnectWallet}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Connect
                    </button>
                )}
            </div >
        </>
    );
}
