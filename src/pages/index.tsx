import { Inter } from 'next/font/google'
import Form from '@/components/Form'
import WalletProvider from '@/contexts/WalletContext'
import Modal from '@/components/Modal'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <WalletProvider />
      <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
        <div className='block max-w-sm rounded-lg bg-white'>
          <Form />
        </div>
      </main>
    </>
  )
}
