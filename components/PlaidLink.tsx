import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { StyledString } from 'next/dist/build/swc/types';
import { useRouter } from 'next/navigation';
import {PlaidLinkOptions, usePlaidLink} from 'plaid'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';

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
        <Button>
          Connect Bank
        </Button>
      ): (
        <Button>
          Connect Bank
        </Button>
      )}
      
    </>
  )
}

export default PlaidLink