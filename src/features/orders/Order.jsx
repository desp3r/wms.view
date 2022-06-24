import React, {useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useUpdateOrderMutation} from "./ordersApiSlice";
import FromSlotsSelection from "./FromSlotsSelection";
import Spinner from "../../app/Spinner";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {useMemo} from "react";
import {Toast} from "../../components/Toast";
import SelectedSlots from "./SelectedSlots";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../accounts/authSlice";
import {Role} from "../../app/helpers/role";

const Order = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state.order;
    const user = useSelector(selectCurrentUser)

    const [selected, setSelected] = useState({});
    const [dispatchCount, setDispatchCount] = useState(order.productCount);
    const [count, setCount] = useState(0);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [submitted, setSubmitted] = useState(true);

    let dCount = 0;
    let sCount = 0;
    let slCount = 0;
    let ready = dispatchCount === 0 && submitted

    const [updateOrder] = useUpdateOrderMutation()

    const onSubmit = async (values, actions) => {
        const array = JSON.parse(JSON.stringify(selectedSlots));
        const resArr = array.map((value) => {
            return {
                slotId: value.id,
                productCount: value.productCount
            }
        });

        const toSend = {
            id: order.id,
            productId: order.productId,
            productCount: order.productCount,
            productDispatches: resArr
        }

        const {data: id} = await updateOrder(toSend);

        if (id) {
            Toast("success", "Замовлення було успішно відправлено")
            navigate("/orders")
        } else {
            Toast("success", "Помилка при обробці замовлення")
        }
    }

    const updateDispatch = (e) => {
        const tValue = e.target.value;
        const intValue = parseInt(tValue);
        sCount = intValue;
        setCount(intValue);
        const newDispatch = dispatchCount - intValue;
        setDispatchCount(newDispatch);
        dCount = newDispatch;
    }

    const submitSlotDispatch = () => {
        slCount = selected.productCount;
        if (dCount < 0 || sCount > slCount || (sCount + dCount) > order.productCount || sCount < 0) {
            Toast("error", "Помилка при виборі кількості")
        } else {
            let array = JSON.parse(JSON.stringify(selectedSlots));
            const index = array.findIndex(x => x.id === selected.id);
            if (index !== -1) {
                array[index].productCount += sCount
            } else {
                const element = JSON.parse(JSON.stringify(selected));
                element.productCount = sCount;
                array.push(element);
            }
            setSelectedSlots(array);
            setSelected({});
            setSubmitted(!submitted)
        }
    }

    const onSelectedDelete = (row) => {
        let array = JSON.parse(JSON.stringify(selectedSlots));
        const result = array.filter(x => x.id !== row.id)
        setSelectedSlots(result);
        let dcount = dispatchCount;
        dcount += row.productCount;
        setDispatchCount(dcount)
    }

    const onSelected = (row) => {
        setSelected(row);
        setSubmitted(!submitted)
    }

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <>
                {selected.id ? (
                    <div>
                        <h5>{selected.title}</h5>
                        <div className="d-flex flex-row mt-2">
                            <input style={{width: "100px"}}
                                   className="form-control"
                                   type="number" min="0"
                                   onChange={updateDispatch}/>
                            <button className="btn btn-outline-success ms-3"
                                    onClick={submitSlotDispatch}>
                                <i className="bi bi-check-lg"></i>
                            </button>
                        </div>
                    </div>
                ) : null}
            </>
        );
    }, [selected]);

    return (
        <div className="container mt-5 mb-5">
            <Formik
                initialValues={order}
                onSubmit={(values, actions) => onSubmit(values, actions)}>
                {({errors, touched, isSubmitting, values, actions}) => (
                    <Form>
                        <div className="d-flex flex-row">
                            <div style={{width: "300px"}}>
                                <div className="d-flex">
                                    <h3>{`Замовлення #${values.id}`}</h3>
                                    <button type="submit"
                                            className="btn btn-outline-success ms-3"
                                            disabled={!ready}>
                                        <i className="bi bi-check-lg"></i>
                                    </button>
                                </div>

                                {order.orderState === 1 &&
                                    <div>
                                        {ready ? (
                                            <div className="d-flex mt-3 p-2 bg-success text-light">
                                                <label>{`Готове для відправки`}</label>
                                            </div>
                                        ) : (
                                            <div className="d-flex mt-3 p-2 bg-secondary text-light">
                                                <label>{`Залишилось додати: ${dispatchCount}`}</label>
                                            </div>
                                        )}
                                    </div>
                                }

                                {order.orderState === 2 &&
                                    <div className="d-flex mt-3 p-2 bg-success text-light">
                                        <label>{`Замовлення відправлено`}</label>
                                    </div>
                                }

                                <div className="form-row mt-3">
                                    <div className="form-group">
                                        <div className="mb-2">
                                            <label htmlFor="clientName"
                                                   className="form-label ms-1">Клієнт</label>
                                            <Field type="text" disabled={true}
                                                   id="clientName" name="clientName"
                                                   className={'form-control'}
                                                   aria-describedby="basic-addon3"/>
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="createdAtUtc"
                                                   className="form-label ms-1">Дата замовлення</label>
                                            <Field type="text" disabled={true}
                                                   id="createdAtUtc"
                                                   value={new Date(values.createdAtUtc).toLocaleString()}
                                                   className={'form-control'}
                                                   aria-describedby="basic-addon3"/>
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="productTitle"
                                                   className="form-label ms-1">Назва продукту</label>
                                            <Field type="text" disabled={true}
                                                   id="productTitle" name="productTitle"
                                                   className={'form-control'}
                                                   aria-describedby="basic-addon3"/>
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="productCount"
                                                   className="form-label ms-1">Кількість</label>
                                            <Field type="text" disabled={true}
                                                   id="productCount" name="productCount"
                                                   className={'form-control'}
                                                   aria-describedby="basic-addon3"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {order.orderState === 1 && (user.role === Role.Admin || user.role === Role.Loader) &&
                            <>
                                <div className="ms-5" style={{width: "400px"}}>
                                    <h3>Продукт зберігається в:</h3>
                                    <div className="mt-3">
                                        <FromSlotsSelection
                                            productId={order.productId}
                                            selected={selected}
                                            onSelected={onSelected}
                                            mComponent={subHeaderComponentMemo}
                                            selectedSlots={selectedSlots}
                                        />
                                    </div>
                                </div>

                                {selectedSlots.length > 0 &&
                                    (<div className="ms-5" style={{width: "400px"}}>
                                        <h3>Обрані контейнери:</h3>
                                        <div className="mt-3">
                                            <SelectedSlots
                                                onSelectedDelete={onSelectedDelete}
                                                selectedSlots={selectedSlots}
                                            />
                                        </div>
                                    </div>)
                                }
                            </>
                            }
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Order;