import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, Spin } from "antd";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrderThunk } from "./../../../redux/action/order";
import { getQRCodeThunk } from "../../../redux/action/payment";
import { MyCart } from "../../../layouts";
import noImage from "../../../assets/images/no-mage.png";

const { Option } = Select;

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //handle render QR code
  const [isCreatingLink, setIsCreatingLink] = useState(false);

  const handleGetPaymentLink = (orderId) => {
    setIsCreatingLink(true);
    dispatch(getQRCodeThunk({ orderId, paymentContent: `Don hang ${orderId}` })).then((res) => {
      window.location.href = res.payload.paymentLink;
      setIsCreatingLink(false);
    });
  };

  ///////////////////////////////////////////////////////

  const handleCreateOrder = (values) => {
    const dataSend = {
      paymentMethod: values.paymentMethod, // string
      rAddress: values.rAddress, // string
      rName: values.rName, //string
      rPhone: values.rPhone, // string
      cartItem: cartServer,
    };

    dispatch(createOrderThunk(dataSend)).then((res) => {
      if (values.paymentMethod == 'CK') handleGetPaymentLink(res.payload.data.orderId);
      else {
        toast.success(res.payload.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/profile")
      };
    });
  };

  const { cartServer, cartQuantity } = useContext(MyCart);

  return (
    <div className="w-full h-full px-10 py-5 justify-center flex">
      <Form layout="vertical" onFinish={handleCreateOrder} className="w-full grid grid-cols-5 grid-rows-1 gap-5">
        <div className="col-span-4 flex flex-col gap-5">
          <div className="bg-white h-fit w-full p-5 rounded-xl border-gray-400">
            <div className="px-2 pb-2 mb-4 font-medium text-4xl border-b w-1/2 text-gray-600">Order's detail</div>
            <div className="px-2 pb-2 grid grid-cols-12 grid-rows-1 mb-4 border-b">
              <div className="col-span-6 font-medium text-2xl text-gray-600">Book</div>
              <div className="col-span-2 col-start-7 font-medium text-2xl text-gray-600 text-center">Cost</div>
              <div className="col-span-2 col-start-9 font-medium text-2xl text-gray-600 text-center">Amount</div>
              <div className="col-span-2 col-start-11 font-medium text-2xl text-gray-600 text-center">Subtotal</div>
            </div>
            {cartServer.map((item) => {
              return (
                <div key={item.id} className="w-auto h-20 grid grid-cols-12 grid-rows-1 gap-4 mb-3 mx-3 border-b">
                  <img
                    className="w-16 min-w-16 h-16 place-content-center"
                    src={item?.image_id ? `${import.meta.env.VITE_BACKEND_API}/api/image/${item.image_id[0]}` : noImage}
                    alt=""
                  />
                  <div className="text-xl text-green-800 font-semibold col-span-5 place-content-center">{item.title}</div>
                  <div className="text-base text-red-600 font-semibold col-span-2 col-start-7 place-content-center text-center">
                    {item.sellingPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}
                  </div>
                  <div className="text-xl text-slate-800 font-semibold col-span-2 col-start-9 place-content-center text-center">{item.quantity}</div>
                  <div className="text-xl text-slate-800 font-semibold col-span-2 col-start-11 place-content-center text-center">
                    {(item.quantity * Number(item.sellingPrice)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col bg-white p-5 rounded-xl border-gray-400">
            <div className="px-2 pb-2 mb-4 font-medium text-4xl border-b w-1/2 text-gray-600">Shipping data</div>
            <div className="flex flex-row gap-5">
              <div className="w-1/2 flex flex-col">
                <div className="px-2 pb-1 font-medium text-base">Receiver's name</div>
                <Form.Item name="rName">
                  <Input className="!w-full h-10 tsext-base" />
                </Form.Item>
              </div>
              <div className="w-1/2 flex flex-col">
                <div className="px-2 pb-1 font-medium text-base">Receiver's phone number</div>
                <Form.Item name="rPhone">
                  <Input className="!w-full h-10 tsext-base" />
                </Form.Item>
              </div>
            </div>
            <div className="px-2 pb-1 font-medium text-base">Receiver's address</div>
            <Form.Item name="rAddress">
              <Input className="!w-full h-10 tsext-base" />
            </Form.Item>
            <div className="px-2 pb-1 font-medium text-base">Payment method</div>
            <Form.Item name="paymentMethod" rules={[{ required: true, message: "Please select a payment method!" }]}>
              <Select className="!w-full h-10 tsext-base" placeholder="Select a payment method">
                <Option value="CK">QR</Option>
                <Option value="COD">COD</Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="col-start-5 h-fit min-w-80 bg-white rounded-xl flex flex-col justify-center p-5 gap-5 border">
          <div className="w-full flex flex-col justify-center gap-5 pb-5 border-b border-gray-400">
            <div className="text-2xl font-bold text-red-600 text-center">Checkout</div>
            <div className="flex flex-row justify-between gap-5">
              <div className="text-lg font-medium text-green-800">Quantity:</div>
              <div className="text-lg font-medium w-32">{cartQuantity}</div>
            </div>
            <div className="flex flex-row justify-between gap-5">
              <div className="text-lg font-medium text-green-800">Total:</div>
              <div className="text-lg font-medium w-32">
                {cartServer
                  .reduce((sum, item) => {
                    return sum + item.quantity * Number(item.sellingPrice);
                  }, 0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}
              </div>
            </div>
          </div>
          <Form.Item>
            <Button
              className="w-52 h-12 z-10 bg-green-800 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-green-500 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl"
              htmlType="submit"
            >
              {isCreatingLink ? <Spin /> : 'Place order'}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Order;
