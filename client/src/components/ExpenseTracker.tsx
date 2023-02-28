
import { ChangeEvent, FormEvent, useState } from "react";
import { postDataToServer } from "../services/menu";

type Props = {
    onTrue: any;
    onClose: any;
};

type State = {
    payeeName: string;
    product: string;
    price: number;
    setDate: string;
};

const ExpenseTracker = (props: Props) => {

    const setDefaultDate = () => {
        const today = new Date();
        return (
            today.getFullYear() +
            "-" +
            ("0" + (today.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + today.getDate()).slice(-2)
        );
    };

    const [state, setState] = useState<State>({
        payeeName: "",
        product: "",
        price: 0,
        setDate: setDefaultDate()
    });

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const finalDate = { ...state, };
        const data = await postDataToServer(finalDate);
        props.onTrue();
    };

    const setpayee = (event: ChangeEvent<HTMLSelectElement>) => {
        setState({
            ...state, payeeName: event.target.value,
        });
    };

    const setProductInfo = (event: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state, product: event.target.value,
        });
    };

    const setPriceInfo = (event: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state, price: parseInt(event.target.value),
        });
    };

    const loggedDate = (event: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state, setDate: event.target.value,
        });
    };

    return (
        <>
            <section>
                <header>
                    <h1>Add New Item</h1>
                    <p>
                        Read the below instructions before proceeding:
                        <br /> Make sure you fill all the fields where * is provided
                    </p>
                </header>
                <form onSubmit={submitHandler}>
                    <article>
                        <p>Name</p>
                        <select
                            name="Name"
                            id="district"
                            required
                            value={state.payeeName}
                            onChange={setpayee}
                        >
                            <option value="" defaultChecked>
                                Choose
                            </option>
                            <option value="Rahul">Rahul</option>
                            <option value="Ramesh">Ramesh</option>
                        </select>
                    </article>
                    <article>
                        <p>Product purchased</p>
                        <input
                            type="text"
                            required
                            value={state.product}
                            onChange={setProductInfo}
                        />
                    </article>

                    <article>
                        <p>Price</p>
                        <input
                            type="number"
                            required
                            value={state.price}
                            onChange={setPriceInfo}
                        />
                    </article>

                    <article>
                        <p>Date</p>
                        <input
                            type="date"
                            required
                            value={state.setDate}
                            onChange={loggedDate}
                        />
                    </article>
                    <button
                        type="button"
                        className="form-button"
                        onClick={props.onClose}
                    >
                        Close
                    </button>
                    <button className="form-button">Submit</button>
                </form>
            </section>
        </>
    );
}

export default ExpenseTracker;
