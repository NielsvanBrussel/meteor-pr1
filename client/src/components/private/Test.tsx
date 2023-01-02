import React from 'react'
import { TEST_AUTH } from '../../queries/userQueries'
import { useQuery, useLazyQuery } from '@apollo/client';


interface Props {

}

const Test: React.FC<Props> = () => {

  const { loading, error, data, refetch } = useQuery(TEST_AUTH, {
    // pollInterval: 5000,
    nextFetchPolicy: 'network-only'
  });


  return (
    <div>
      <div>Test</div>
      <button onClick={() => refetch()}>check auth</button>
      <button onClick={() => console.log(data?.testAuth.message)}>log data</button>
    </div>

  )
}

export default Test