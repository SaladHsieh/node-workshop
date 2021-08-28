import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const StockDetails = () => {
    const { stockId } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getStockData = async () => {
            try {
                let res = await axios.get('http://localhost:8000/stock/' + stockId);

                let data = res.data;

                setData(data);
                setError(null);
            } catch (e) {
                console.log(e);
                setError(e.message);
            }
        };
        getStockData();
    }, []);

    return (
        <div>
            {error && <div>{error}</div>}

            {data && data.map(day => (
                <div className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6" key={day.date}>
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">日期： {day.date.slice(0, 10)}</h2>
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">成交金額： {day.amount}</h2>
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">成交股數： {day.volume}</h2>
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">開盤價： {day.open_price}</h2>
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">收盤價： {day.close_price}</h2>
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">漲跌價差： {day.delta_price}</h2>
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">最高價： {day.high_price}</h2>
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">最低價： {day.low_price}</h2>
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">成交筆數： {day.transactions}</h2>
                </div>
            ))}
        </div>
    );
};

export default StockDetails;
