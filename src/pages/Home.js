import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CustomerRewars from '../Components/CustomerRewars';
import "../assets/css/style.css"
import { groupCustomerById, groupTransactionById } from '../helper/helper';

const Home = (props) => {
  // used below useSate for handling api data,filter data,search text and error message
  const [data, setData] = useState({
    customerData: [],
    filterData: [],
    searchData: "",
    errorMsg: ""
  })

  useEffect(() => {

    //Function will call for getting data from json and set the state
    getDataFormLocalJsonApi()

  }, [])

  const getDataFormLocalJsonApi = () => {
    let newdata = new Promise((resolve, reject) => {

      //JSON file is stored in public folder
      axios.get("/Customer.json")
        .then((ele) => {
          if (ele?.status === 200) {
            //if we get success then this block call
            resolve(groupCustomerById(ele.data)) //the groupCustomerById function used to convert array with the help of unique customerId
          }
          else {
            //if we get error then this block call
            reject("No Records Found")
          }
        })
        .catch((error) => reject(error.message))

    })

    //newdata return promise data
    newdata.then((res) => {
      setData({
        ...data,
        customerData: res,
        filterData: res
      })
    }).catch((err) => setData({
      ...data,
      errorMsg: err,
    }))
  }

  const handleSearch = (value) => {
    //filter the data with customer name
    const filterd = data?.customerData?.filter((customer) => customer.customerName.toLowerCase().includes(value.toLowerCase()))
    setData({
      ...data,
      searchData: value,
      filterData: filterd,
    })

  }

  return (
    <>
      <div className='home'>
        <h1>Customer Rewards</h1>
        {/** Search Box section*/}
        <input type='text' placeholder='Search customer name' key={"search"} value={data.searchData} onChange={(e) => {
          handleSearch(e?.target?.value)
        }} className='searchBox' />
        {/** Error Message section */}
        {data.errorMsg ? <h2 className='error'>{data.errorMsg}</h2>
          :
          <div className='customerRewards'>
            {/** Customer Rewards section */}
            {data?.filterData?.length > 0 ? data.filterData.map((res) => (
              <CustomerRewars customerData={res} />
            )) : <h3>No Data Found</h3>}
          </div>
        }
      </div>

    </>
  )
}


export default Home
