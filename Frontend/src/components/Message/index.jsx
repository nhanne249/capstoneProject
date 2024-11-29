import { Alert } from 'antd';

const Message = ({variant}) => {
    return (
        (variant === 'warning')?
        <Alert
        className='text-center h-16 m-8'
        message="Not Delivered"
        type="warning"
        />:
        <Alert
        className='text-center h-16 m-8'
        message="Order has been delivered"
        description="Success Description Success Description Success Description"
        type="success"
        />
        
    );
};

export default Message;