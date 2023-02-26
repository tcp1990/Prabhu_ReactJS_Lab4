import React, { useEffect, useState } from 'react';
import IDataList from '../models/IDataList';
import { getDataFromServer } from '../services/menu';

function ShowList() {
    const [items, setItems] = useState<IDataList[]>([]);

    useEffect(() => {
        const getExpenseData = async () => {
            try {
                const expenseData = await getDataFromServer();
                console.log(expenseData);
                setItems(expenseData);
            } catch (error) {

            } finally {

            }
        };

        getExpenseData();
    }, []);

    return (
        <>
            <div className="use-inline date header-color">Date</div>
            <div className="use-inline header-color">Product Purchased</div>
            <div className="use-inline price header-color">Price</div>
            <div className="use-inline header-color" style={{ width: 112 }}>Payee</div>
            {
                items && 
                items.map((item: IDataList, idx) => (

                    <div key={idx}>
                        <div className="use-inline date">{item.setDate}</div>
                        <div className="use-inline">{item.product}</div>
                        <div className="use-inline price">{item.price}</div>
                        <div className={`use-inline ${item.payeeName}`}>{item.payeeName}</div>
                    </div>
                ))
            }
            <hr/>
        </>
        
    );
}

export default ShowList;