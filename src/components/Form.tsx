import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import ConnectButton from "./ConnectButton";
import { Accounts } from "./Accounts";

interface Currency {
    nep: number;
    busd: number;
}
export default function Form() {
    const [currency, setCurrency] = useState<Currency>({
        nep: 0,
        busd: 0
    });

    const [visible, setVisible] = useState<boolean>(false);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const numValue: number = value !== '' ? parseFloat(value) : 0;
        const convert: Currency = {
            busd: 0,
            nep: 0
        };
        if (name === 'busd') {
            convert.nep = +(numValue * 3).toFixed(2);
            convert.busd = numValue;
        }
        if (name === 'nep') {
            convert.nep = numValue;
            convert.busd = +(numValue / 3).toFixed(2);
        }
        setCurrency(convert);
    };

    const handleCheckWallet = (event: React.MouseEvent<HTMLElement>) => {
        setVisible(!visible);
    }

    return (
        <>
            {
                visible && (
                    <Accounts />
                )
            }
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Currency converter</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="nep" className="block text-sm font-medium leading-6 text-gray-900">NEP</label>
                            <div className="mt-2">
                                <input
                                    id="nep"
                                    name="nep"
                                    type="number"
                                    required
                                    value={currency.nep}
                                    onChange={handleInputChange}
                                    step=".01"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="busd" className="block text-sm font-medium leading-6 text-gray-900">BUSD</label>
                            <div className="mt-2">
                                <input
                                    id="busd"
                                    name="busd"
                                    type="number"
                                    value={currency.busd}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={handleCheckWallet}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Check wallet</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}