import { useState, useContext, useEffect } from "react";
import { From, Input, Button } from "anrd";
import { getUserCartThunk } from "../../../redux/action/cart";
import { createOrderThunk } from "./../../../redux/action/order";
import { MyCart } from "../../../layouts";
const Order = () => {
  const { cartServer, cartClient } = useContext(MyCart);

  return <div>Order</div>;
};

export default Order;
