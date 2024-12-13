import successImg from "../../../assets/images/success.png";
import cancelImg from "../../../assets/images/cancel.png";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getPaymentInfoThunk } from "../../../redux/action/payment";
import { useDispatch } from "react-redux";

const PaymentResult = () => {

    const location = useLocation();
    const { search } = location;
    const params = new URLSearchParams(search);
    const orderCode = params.get('orderCode');
    const cancel = params.get('cancel');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPaymentInfoThunk(orderCode)).then(() => {
            localStorage.removeItem("cart");
        })
    }, [])

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-5">
            <img alt={cancel == "true" ? "Cancel" : "Success"} src={cancel == "true" ? cancelImg : successImg} width={150} height={150} />
            <div className="flex flex-row">
                <div className="text-3xl font-medium text-gray-600">Order code : </div>
                <div className="text-3xl font-medium text-sky-800">{orderCode}</div>
            </div>
            <div className="text-base w-fit font-medium text-gray-600">
                {cancel != "true" ? "Your order has been placed successfully and will be delivered to you as soon as possible." : " The order has been cancelled"}
            </div>
        </div>
    );
};

export default PaymentResult;