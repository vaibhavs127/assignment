import React, { useEffect, useState } from 'react'
import RewardsTable from './RewardsTable';
import { calculatePoints } from '../helper/helper';

const CustomerRewars = (props) => {

  const [rewards, setRewards] = useState({
    monthly: {}, total: 0
  })

  const calculateRewards = () => {
    try {
      const monthlyRewards = {};
      props.customerData.dollerSpent.forEach((tt) => {
        const key = `${tt.year}-${tt.month}`
        console.log(key, monthlyRewards);
        if (!monthlyRewards[key]) {
          monthlyRewards[key] = 0
        }
        monthlyRewards[key] += calculatePoints(tt.amount)
      })
      const totalRewards = Object.values(monthlyRewards).reduce((acc, points) => acc + points, 0)
      setRewards({
        monthly: monthlyRewards,
        total: totalRewards
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log(props);
    calculateRewards()
  }, [props?.customerData])

  return (
    <div className='custRewards'>
      <h2>Customer Name: {props?.customerData?.customer ? props?.customerData?.customer.toUpperCase() : "-"}</h2>
      <h2>Total: {rewards.total ? rewards.total : rewards.total}</h2>
      <RewardsTable monthlyRewards={rewards.monthly} />
    </div>
  )
}

export default CustomerRewars