import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrderByIdThunk } from '../../../redux/action/order'

const OrderDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const [order, setOrder] = useState();

  useEffect(() => {
    dispatch(getOrderByIdThunk(id))
    .then((res) => {
      setOrder(res.payload.response);
      console.log(res);
    });
  }, []);

    return (
    <div>
        This page shows order {id}'s details
    </div>
  )
}

export default OrderDetail
