import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrderThunk } from "./../../../redux/action/order";
import { MyCart } from "../../../layouts";

const { Option } = Select;

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddBoook = (values) => {
    console.log(values);
    const dataSend = {
      paymentMethod: values.paymentMethod, // string
      rAddress: values.rAddress, // string
      rName: values.rName, //string
      rPhone: values.rPhone, // string
      cartItem: cartServer,
    };

    dispatch(createOrderThunk(dataSend)).then((res) => {
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
    });

    navigate("/profile");
  };

  const { cartServer } = useContext(MyCart);
  console.log(cartServer);

  return (
    <div className="w-full h-full px-10 py-5 justify-center flex">
      <Form layout="vertical" onFinish={handleAddBoook}>
        <div className="flex flex-col">
          <div className="px-2 pb-1 font-medium text-base">Receiver's name</div>
          <Form.Item name="rName">
            <Input className="!w-[720px] h-10 tsext-base" />
          </Form.Item>

          <div className="px-2 pb-1 font-medium text-base">Receiver's address</div>
          <Form.Item name="rAddress">
            <Input className="!w-[720px] h-10 tsext-base" />
          </Form.Item>

          <div className="px-2 pb-1 font-medium text-base">Receiver's phone number</div>
          <Form.Item name="rPhone">
            <Input className="!w-[720px] h-10 tsext-base" />
          </Form.Item>

          <div className="px-2 pb-1 font-medium text-base">Payment method</div>
          <Form.Item name="paymentMethod" rules={[{ required: true, message: "Please select a payment method!" }]}>
            <Select className="!w-[720px] h-10 tsext-base" placeholder="Select a payment method">
              <Option value="MoMo">MoMo</Option>
              <Option value="COD">COD</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            className="w-52 h-12 z-10 bg-sky-300 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-sky-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl"
            htmlType="submit"
          >
            Create order
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Order;
