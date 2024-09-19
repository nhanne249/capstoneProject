import "./styles.scss";
import CardCustom from "../../utils/components/card";

const Main = () => {
  return (
    <div className="">
      <CardCustom
        imgLink="https://lib.hcmut.edu.vn/uploads/noidung/giao-trinh-giai-tich-1-0-830.jpg"
        content="Giai tich 1"
        cardClassName="w-40 bg-transparent border-none"
        contentClassName="font-sans text-base font-medium text-gray-500"
      />
    </div>
  );
};

export default Main;
