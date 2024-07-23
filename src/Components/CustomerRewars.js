import React, { useEffect, useState } from 'react'
import RewardsTable from './RewardsTable';
import { calculatePoints, monthNames } from '../helper/helper';

const CustomerRewars = (props) => {

  const [rewards, setRewards] = useState([])

  const calculateRewards = () => {
    try {
      const rewardsArray = []
      props?.customerData?.transactions?.forEach((res) => {
        let date = new Date(res.date);
        let month = date.getMonth();
        let year = date.getFullYear()
        const monthName = monthNames[month]
        const points = calculatePoints(res?.amount)
        rewardsArray.push({
          amount: res.amount,
          year: year,
          monthName: monthName,
          points: points,
        })

      })
      setRewards(rewardsArray)
    }
    catch (err) {
      throw new Error(err)
    }
  }

  useEffect(() => {
    calculateRewards()
  }, [props?.customerData])


  return (
    <div className='custRewards'>
      <h2>Customer Name: {props?.customerData.customerName.toUpperCase()}</h2>
      <RewardsTable monthlyRewards={rewards} />
    </div>
  )
}

export default CustomerRewars
