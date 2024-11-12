import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { getBookThunk } from "../../../redux/action/book";
import { getReviewByBookIdThunk } from "./../../../redux/action/review";
import { ShoppingCartOutlined } from "@ant-design/icons";

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [book, setBook] = useState();
  const [review, setReview] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [count, setCount] = useState(1);

  useEffect(() => {
    dispatch(getBookThunk(params.id)).then((res) => {
      setBook(res.payload.data);
    });
    dispatch(getReviewByBookIdThunk(params.id)).then((res) => {
      setReview(res.payload.data);
    });
  }, []);

  useEffect(() => {
    setThumbnail(book?.image[0]);
  }, [book]);

  const handleClickAddToCartBtn = () => {
    setCount(count + 1);
    console.log(params.id);
  };
  return (
    <div className="w-full h-full flex flex-col px-5">
      <div className="w-full h-full grid grid-cols-2 grid-rows-1 gap-5">
        <div className="w-2/5 h-full">
          <div className="w-4/5 full">
            <img src={thumbnail} alt="thumbnail" />
          </div>
          <div className="w-1/5 h-1/2">
            {book?.image?.map((img, index) => (
              <img key={index} src={img} alt="img" className="w-full h-full" />
            ))}
          </div>
        </div>
        <div className="w-3/5 h-full">
          <div>{book?.author}</div>
          <div>{book?.title}</div>
          <div>{book?.sellingPrice}</div>
          <div>
            <Button
              icon={<ShoppingCartOutlined />}
              onClick={() => handleClickAddToCartBtn()}
              iconPosition="end"
              className="w-52 h-12 z-10 bg-sky-300 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-sky-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
      <div className="">review</div>
    </div>
  );
};

export default Product;
