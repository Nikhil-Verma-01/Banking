import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { StyledString } from 'next/dist/build/swc/types';
import { useRouter } from 'next/navigation';
import {PlaidLinkOptions, usePlaidLink} from 'plaid'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import Image from 'next/image';

const PlaidLink = ({user, variant}: PlaidLinkProps ) => {
  const router = useRouter();
  const [token, setToken] = useState('');
  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);

      setToken(data?.linkToken)
    }
    getLinkToken();
  }, []);

  const onSuccess = useCallback(async (public_token: StyledString) => {
    await exchangePublicToken({
      publicToken: public_token,
      user,
    })

    router.push('/');
  }, [user])

  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }

  const {open, ready} = usePlaidLink(config);

  return (
    <>
      {variant == 'primary' ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className='plaidlink-primary'
        >
          Connect Bank
        </Button>
      ): variant === 'ghost' ? (
        <Button onClick={() => open()} variant="ghost"
        className='plaidlink-ghost'>
          Connect Bank
        </Button>
      ): (
        <Button onClick={() => open()} 
        className='plaidlink-default'>
          <Image
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className='hiddenl text-[16px] font-semibold text-black-2 xl:block'>
            Connect Bank
          </p>
          
        </Button>
      )}
      
    </>
  )
}

export default PlaidLink