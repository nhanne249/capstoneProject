import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderByIdThunk } from "../../../redux/action/order";
import { MyCart } from "../../../layouts";
import noImage from "../../../assets/images/no-mage.png";
import { Button, Col, Row, Grid } from "antd";
import Message from "../../../components/Message";
const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [order, setOrder] = useState();
  const [items, setItems] = useState();
  // const navigate = useNavigate();
  const { cartServer, cartQuantity } = useContext(MyCart);
  const [total, setTotal] = useState(
    cartServer.reduce((sum, item) => {
      return sum + item.quantity * Number(item.sellingPrice);
    }, 0)
  );

  const handlePlaceOrder = () => {
    console.log(`Place Order no ${id}`)
  }
  // useEffect(() => {
    // setTotal(
    //   cartServer.reduce((sum, item) => {
    //     return sum + item.quantity * Number(item.sellingPrice);
    //   }, 0)
    // );
  // }, [cartServer]);

  useEffect(() => {
    dispatch(getOrderByIdThunk(id)).then((res) => {
      setOrder(res?.payload.data);
      // setItems(res?.payload.data.cartItem);
      setTotal(res?.payload.data.totalPrice);
      console.log(res);
    });
  }, []);

  return (
    <div className="m-6">
      <Row>
        <Col className='d-flex flex-column mt-1' span={16}>
          <h1 className="text-3xl font-medium font-sans text-green-600 mb-4">Shipping:</h1>
          <p className="text-lg font-sans">
              Name : {order?.rName}
          </p>
          <p className="text-lg font-sans">
              Phone : {order?.rPhone}
          </p>
          <p className="text-lg font-sans">
              Shipping : {order?.rAddress}
          </p>
          <Message variant="warning" />
          <h1 className="text-3xl font-medium font-sans text-green-600 mb-4">Payment method:</h1>
          <p className="text-lg font-sans">
              Method : {order?.paymentMethod}
          </p>
          <h1 className="text-3xl font-medium font-sans text-green-600 mb-4 mt-4">Order Items:</h1>

          <div className="col-span-4 flex flex-col border rounded-lg py-2 h-fit">
            {cartServer.map((item) => {
              return (
                <div
                  key={item.id}
                  className="w-auto h-20 grid grid-cols-10 grid-rows-1 gap-4 mx-3 border-b"
                >
                  <img
                    className="w-16 min-w-16 h-16"
                    src={
                      item?.image_id
                        ? `${import.meta.env.VITE_BACKEND_API}/api/image/${
                            item.image_id[0]
                          }`
                        : noImage
                    }
                    alt=""
                  />
                  <div className="col-span-5 flex flex-col gap-1">
                    <div className="text-xl text-green-800 font-semibold">
                      {item.title}
                    </div>
                    <div className="text-base text-red-600 font-semibold">
                      {item.quantity} x {item.sellingPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                        " = "} {item.quantity*item.sellingPrice} VND
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
        <Col>
          <div className="col-start-5 min-w-80 bg-yellow-50 rounded-xl flex flex-col justify-center p-5 gap-5 border-yellow-500 w-1/5 border">
            <div className="w-full flex flex-col justify-center gap-5 pb-5 border-b border-gray-400">
              <div className="text-2xl font-bold text-red-600 text-center">
                Order summary
              </div>
              <div className="flex flex-row justify-between gap-5">
                <div className="text-lg font-medium text-green-800">
                  Quantity:
                </div>
                <div className="text-lg font-medium w-32">{cartQuantity}</div>
              </div>
              <div className="flex flex-row justify-between gap-5">
                <div className="text-lg font-medium text-green-800">
                  Items:
                </div>
                <div className="text-lg font-medium w-32">{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                    " VND"}</div>
              </div>
              <div className="flex flex-row justify-between gap-5">
                <div className="text-lg font-medium text-green-800">
                  Tax:
                </div>
                <div className="text-lg font-medium w-32">{0 + " VND"}</div>
              </div>
              <div className="flex flex-row justify-between gap-5">
                <div className="text-lg font-medium text-green-800">Total:</div>
                <div className="text-lg font-medium w-32">
                  {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                    " VND"}
                </div>
              </div>
            </div>

            <Button
              className="self-center w-52 h-12 z-10 mb-5 bg-green-600 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-green-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl"
              onClick={() => handlePlaceOrder()}
            >
              Place order
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetail;
