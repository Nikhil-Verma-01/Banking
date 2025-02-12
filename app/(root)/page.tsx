import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home = async () => {
    const loggedIn = await getLoggedInUser();
  return (
    <section className='home'>
        <div className='home-content'>
            <header>
                <HeaderBox
                type="greeting"
                title="Welcome"
                user={loggedIn ?.firstName || 'Guest'}
                subtext="Access and manage your account and transactions efficiently"
                />

                <TotalBalanceBox
                accounts={[]}
                totalBanks={1}
                totalCurrentBalance={1250.35}
                />

            </header>
            RECENT Transction

        </div>
        <RightSideBar
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 123.5},{currentBalance:4520.85}]}
        />
    </section>
  )
}

export default Home