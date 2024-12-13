import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { InputNumber, Button } from "antd";
import { MyCart } from "../../../layouts";
import noImage from "../../../assets/images/no-mage.png";

const Cart = () => {
  const navigate = useNavigate();
  const { isLogin, cartServer, setCartClient, cartQuantity, cartClient, setIsFetch } = useContext(MyCart);
  const [total, setTotal] = useState(
    0
  );
  useEffect(() => {
    if (cartClient.length > 0) setIsFetch(true);
  }, [])
  useEffect(() => {
    if (cartServer.length > 0)
      setTotal(
        cartServer.reduce((sum, item) => {
          return sum + item.quantity * Number(item.sellingPrice);
        }, 0)
      );
  }, [cartServer]);
  const handleClickAdd = (id) => {
    setCartClient((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === parseInt(id));

      if (existingProduct) {
        return prevCart.map((item) => (item.id === parseInt(id) ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        return [...prevCart, { id: parseInt(id), quantity: 1 }];
      }
    });
  };
  const handleClickMinus = (id) => {
    setCartClient((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === parseInt(id)) {
            const updatedQuantity = item.quantity - 1;
            if (updatedQuantity <= 0) {
              return null;
            }
            return { ...item, quantity: updatedQuantity };
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const handleChangeQuantity = ({ id }, value = 0) => {
    setCartClient((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === parseInt(id)) {
          return { ...item, quantity: Math.max(value, 0) };
        }
        return item;
      });
    });
  };

  const handleDeleteBookFromCart = ({ id }) => {
    setCartClient((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === parseInt(id)) {
            return null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const handleClickCheckout = () => {
    if (isLogin) navigate("/order");
    else {
      toast.warning("You need to signin before checkout!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/signin");
    }
  };

  return cartServer?.length > 0 ? (
    <div className="w-full h-full px-10 py-5 grid grid-cols-5 grid-rows-1 gap-4">
      <div className="col-span-4 flex flex-col border rounded-lg py-5 h-full bg-white">
        {cartServer?.map((item) => {
          return (
            <div key={item.id} className="w-auto h-20 grid grid-cols-10 grid-rows-1 gap-4 mx-3 border-b">
              <img className="w-16 min-w-16 h-16" src={item?.image_id ? `${import.meta.env.VITE_BACKEND_API}/api/image/${item.image_id[0]}` : noImage} alt="" />
              <div className="col-span-5 flex flex-col gap-1">
                <div className="text-xl text-green-800 font-semibold">{item.title}</div>
                <div className="text-base text-red-600 font-semibold">{item.sellingPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</div>
              </div>
              <div className="col-span-2 col-start-7 flex flex-row justify-center items-center gap-0">
                <button className="border border-e-0 w-10 h-10 p-0 rounded-s-lg" onClick={() => handleClickAdd(item.id)}>
                  +
                </button>
                <InputNumber
                  type="number"
                  className="rounded-none h-10 w-10 border text-center content-center"
                  controls={false}
                  value={item.quantity}
                  onChange={(value) => handleChangeQuantity({ id: item.id }, value)}
                />
                <button className="border border-s-0 w-10 h-10 p-0 rounded-e-lg" onClick={() => handleClickMinus(item.id)}>
                  -
                </button>
              </div>
              <div
                className="col-span-2 h-fit col-start-9 text-base cursor-pointer underline text-red-600 self-center"
                onClick={() => handleDeleteBookFromCart({ id: item.id })}
              >
                Delete this book!
              </div>
            </div>
          );
        })}
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
            <div className="text-lg font-medium w-32">{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</div>
          </div>
        </div>

        <Button
          className="self-center w-52 h-12 z-10 mb-5 bg-green-600 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-green-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl"
          onClick={() => handleClickCheckout()}
        >
          Checkout
        </Button>
      </div>
    </div>
  ) : (
    <div className="w-full h-full px-10 py-5 text-xl text-green-800 font-semibold">No item in cart!</div>
  );
};

export default Cart;
