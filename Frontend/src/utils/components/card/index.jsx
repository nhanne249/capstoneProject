import { Card } from "antd";

const CardCustom = (value) => {
  return (
    <Card
      hoverable
      className={value.className}
      cover={<img className="!w-4/5 !h-4/5" alt="Giai tich 1" src={value.imgLink} />}
    >
      <p className={value.contentClassName}>{value.title}</p>
    </Card>
  );
};

export default CardCustom;
