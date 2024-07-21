import React, { useEffect } from 'react'

const RewardsTable = (props) => {

  return (
    <>
      <table className='centerTable'>
        <tr>
          <th>Months</th>
          <th>Points</th>
        </tr>
        {Object.keys(props?.monthlyRewards).map((res) => (
          <tr key={res}>
            <td>{res}</td>
            <td>{props?.monthlyRewards[res]}</td>
          </tr>))}
      </table>
    </>
  )
}

export default RewardsTable
