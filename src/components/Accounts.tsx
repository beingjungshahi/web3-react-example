import type { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import type { Web3ReactHooks } from '@web3-react/core'
import { useEffect, useState } from 'react'
import Modal from './Modal'
import { hooks, metaMask } from '@/hooks/metaMask'

const { useChainId, useIsActivating, useIsActive, useProvider, useENSNames, useAccount, useAccounts } = hooks;

// function useBalances(
//     provider?: ReturnType<Web3ReactHooks['useProvider']>,
//     accounts?: string[]
// ): BigNumber[] | undefined {
//     const [balances, setBalances] = useState<BigNumber[] | undefined>()

//     useEffect(() => {
//         if (provider && accounts?.length) {
//             let stale = false

//             void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
//                 if (stale) return
//                 setBalances(balances)
//             })

//             return () => {
//                 stale = true
//                 setBalances(undefined)
//             }
//         }
//     }, [provider, accounts])

//     return balances
// }

export function Accounts({
    // accounts,
    // provider,
    ENSNames,
}: {
    // accounts?: ReturnType<Web3ReactHooks['useAccounts']>
    // provider?: ReturnType<Web3ReactHooks['useProvider']>
    ENSNames?: ReturnType<Web3ReactHooks['useENSNames']>
}) {
    const provider = useProvider()
    const account = useAccount()
    const isActive = useIsActive()
    const chainId = useChainId();

    const [balance, setBalance] = useState<number | undefined | BigNumber>(undefined);

    // const getBalance = async () => {
    //     await provider?.getBalance(account);
    // }
    const [visible, setVisible] = useState<boolean>(true);

    const handleCheckButton = (event: React.MouseEvent<HTMLElement>) => {
        setVisible(!visible);
    }
    useEffect(() => {
        let stale = false;

        const getBalance = async () => {
            try {
                const balance = await provider?.getBalance(account ? account : '');
                if (!stale) {
                    setBalance(balance);
                }
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        if (provider && account?.length) {
            getBalance();
        }

        return () => {
            stale = true;
        };
    }, [provider, account]);

    if (!isActive) return (
        <>
            <Modal title="Wallet Details" connect visible={visible}>
                <p>
                    Wallet not connected. please click the connect button below
                </p>
            </Modal>
        </>
    )

    return (
        <Modal title="Wallet Details" connect visible={visible}>
            <table>
                <tbody>
                    <tr>
                        <th>Chain ID</th>
                        <td>{chainId}</td>
                    </tr>
                    <tr>
                        <th>Account</th>
                        <td>{account}</td>
                        {/* <td>{walletDetails?.chainId}</td> */}
                        {/* <td>{balances?.[0] ? ` (Ξ${formatEther(balances[0])})` : null} ETH</td> */}
                    </tr>
                    <tr>
                        <th>Balance</th>
                        <td>{balance !== undefined ? `${balance}` : 'Loading...'}</td>
                        {/* <td>{walletDetails?.chainId}</td> */}
                        {/* <td>{balances?.[0] ? ` (Ξ${formatEther(balances[0])})` : null} ETH</td> */}
                    </tr>
                </tbody>
            </table>
        </Modal>
        // <div>
        //     Accounts:{' '}
        //     <b>
        //         {accounts.length === 0
        //             ? 'None'
        //             : accounts?.map((account, i) => (
        //                 <ul key={account} style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        //                     {ENSNames?.[i] ?? account}
        //                     {balances?.[i] ? ` (Ξ${formatEther(balances[i])})` : null}
        //                 </ul>
        //             ))}
        //     </b>
        // </div>
    )
}