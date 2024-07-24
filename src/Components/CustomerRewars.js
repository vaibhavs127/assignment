import React, { useEffect, useState } from 'react'
import RewardsTable from './RewardsTable';
import { calculatePoints, monthNames } from '../helper/helper';

const CustomerRewars = (props) => {
  //useSate used for set the perticuler user information
  const [rewards, setRewards] = useState([])

  const calculateRewards = () => {
    try {
      if (!Array.isArray(props.customerData.transactions)) {
        throw new Error("Invalid Array")
      }
      const rewardsArray = []
      props.customerData.transactions?.forEach((res) => {
        if (!res.date || !res.amount) {
          throw new Error("Date and Amount is required")
        }
        let date = new Date(res.date);
        let month = date.getMonth(); //get month from date
        let year = date.getFullYear() //get year from date
        const monthName = monthNames[month] //monthNames array used for find month name from month index
        const points = calculatePoints(res?.amount) //calculate the points for every doller spent
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
    //function will call when its dependency value change
    if (props?.customerData?.transactions) {
      calculateRewards()
    }

  }, [props?.customerData])


  return (
    <div className='custRewards'>
      <h2>Customer Name: {props?.customerData.customerName.toUpperCase()}</h2>
      {/**Display individula user data in table format */}
      <RewardsTable monthlyRewards={rewards} />
    </div>
  )
}

export default CustomerRewars
