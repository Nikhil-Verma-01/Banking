import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
    const loggedIn = {firstName : 'Nikhil', lastName: 'Verma',
      email: 'vermanikhil9123@gmail.com'
    }
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