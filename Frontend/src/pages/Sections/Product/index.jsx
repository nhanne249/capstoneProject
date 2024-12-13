import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Rate } from "antd";
import { getBookPublicThunk } from "../../../redux/action/book";
import { getReviewByBookIdThunk } from "./../../../redux/action/review";
import { ShoppingCartOutlined } from "@ant-design/icons";
import noImage from "../../../assets/images/no-mage.png";
import { MyCart } from "../../../layouts";

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { cartQuantity, setCartQuantity, cartClient, setCartClient } = useContext(MyCart);

  const [book, setBook] = useState();
  const [reviews, setReviews] = useState();
  const [thumbnail, setThumbnail] = useState();

  useEffect(() => {
    dispatch(getBookPublicThunk(params.id)).then((res) => {
      setBook(res.payload.data);
    });
    dispatch(getReviewByBookIdThunk(params.id)).then((res) => {
      setReviews(res.payload);
    });
  }, []);

  useEffect(() => {
    setThumbnail(book?.image_id ? `${import.meta.env.VITE_BACKEND_API}/api/image/${book.image_id[0]}` : noImage);
  }, [book]);

  const handleClickAddToCartBtn = () => {
    setCartClient((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === parseInt(params.id));

      if (existingProduct) {
        return prevCart.map((item) => (item.id === parseInt(params.id) ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        return [...prevCart, { id: parseInt(params.id), quantity: 1 }];
      }
    });
    setCartQuantity(cartQuantity + 1);
  };
  return (
    <div className="w-full h-auto flex flex-col px-5 gap-5 bg-white">
      <div className="w-full h-3/5 grid grid-cols-2 grid-rows-1 gap-5 pt-4 px-5">
        <div className="w-full h-full flex flex-row gap-2">
          <div className="w-4/5 h-auto">
            <img className="w-full h-auto aspect-[1/1] rounded-lg" src={thumbnail} alt="thumbnail" />
          </div>
          <div className="w-1/5 h-fit">
            {book?.image_id?.map((img, index) => (
              <img
                key={index}
                src={`${import.meta.env.VITE_BACKEND_API}/api/image/${img}`}
                alt="img"
                className="w-full aspect-[1/1] rounded-lg"
                onClick={() => setThumbnail(`${import.meta.env.VITE_BACKEND_API}/api/image/${img}`)}
              />
            ))}
          </div>
        </div>
        <div className="w-full h-full flex flex-col">
          <div className="text-sm text-slate-400 font-semibold">{book?.author}</div>
          <div className="text-5xl text-green-800 font-semibold mb-5">{book?.title}</div>
          <div className="text-3xl text-red-600 font-semibold mb-5">{book?.sellingPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</div>
          <Button
            icon={<ShoppingCartOutlined />}
            onClick={() => handleClickAddToCartBtn()}
            iconPosition="end"
            disabled={cartClient.find((item) => item.id === params.id)?.quantity >= book?.quantity ? true : false}
            className="w-52 h-12 z-10 bg-green-500 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-green-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl disabled:bg-green-800"
          >
            Add to cart
          </Button>
          <div className="text-xl text-slate-900 font-medium mt-5">{book?.description}</div>
        </div>
      </div>
      <div className="w-full h-full flex-grow flex flex-col">
        <div className="w-1/2 text-3xl text-green-800 font-semibold border-b border-black mb-5">Review</div>
        {reviews ? (
          reviews?.map((review, index) => <div key={index} className="flex flex-col gap-2 w-full border rounded-md p-2">
            <div className="text-xl font-bold">{review.name}</div>
            <div className="text-sm text-gray-300">{review.reviewDate}</div>
            <Rate value={review.rating} disabled={true} />
            <div className="text-base">{review.content}</div>
          </div>)
        ) : (
          <div className="text-xl text-slate-400 font-semibold">There are no review for this product!</div>
        )}
      </div>
    </div>
  );
};

export default Product;
