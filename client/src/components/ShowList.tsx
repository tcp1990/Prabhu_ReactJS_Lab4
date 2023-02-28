import React, { useEffect, useState } from 'react';
import IDataList from '../models/IDataList';
import { getDataFromServer } from '../services/menu';
import ExpenseTracker from './ExpenseTracker';

function ShowList() {
    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [sum, setSum] = useState<number | null>();
    const [rahulspent, setRahulspent] = useState<number>(0);
    const [rameshspent, setRameshspent] = useState<number>(0);
    const [showform, setShowForm] = useState<boolean>(false);

    var rahulspent1: number = 0;
    var rameshspent1: number = 0;

    useEffect(() => {
        const getExpenseData = async () => {
            try {
                const expenseData = await getDataFromServer();
                setItems(expenseData);
                setSum(expenseData.reduce((result, v) => (result = result + v.price), 0));
                Shares(expenseData);
            } catch (error: any) {
                setError(error);
            } finally {

            }
        };

        getExpenseData();
    }, [showform]);

    const Shares = (expenseData: IDataList[]) => {
        expenseData.map((item) =>
            item.payeeName === "Rahul"
                ? (rahulspent1 += item.price)
                : (rameshspent1 += item.price)


        );
        setRahulspent(rahulspent1);
        setRameshspent(rameshspent1);
    };

    const success = () => {
        setShowForm(false);
    };

    const cancel = () => {
        setShowForm(false);
    };

    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            <button id="Add-Button" onClick={() => setShowForm(true)}> Add</button>
            {showform && (
                <div className="form">
                    <ExpenseTracker onTrue={success} onClose={cancel} />
                </div>
            )}
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{ width: 112 }}>Payee</div>
            </>
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
            <hr />
            <div className="use-inline">Total: </div>
            <span className="use-inline total">{sum}</span><br />
            <div className="use-inline">Rahul Paid: </div>
            <span className="use-inline total Rahul">{rahulspent}</span><br />
            <span className="use-inline">Ramesh paid: </span>
            <span className="use-inline total Ramesh">{rameshspent}</span><br />
            <span className="use-inline payable">
                {rahulspent > rameshspent ? "Pay Rahul" : "Pay Ramesh"}
            </span>
            <span className="use-inline payable price">
                {" "}
                {Math.abs((rahulspent - rameshspent) / 2)}
            </span>
            {error && <>{error?.message}</>}
        </>

    );
}

export default ShowList;