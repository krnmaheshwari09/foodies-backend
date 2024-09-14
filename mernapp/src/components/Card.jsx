import React, { useEffect, useRef, useState } from "react";
import {useCart, useDispatchCart} from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.item.options[0];
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState();
  const handleAddToCart = async () => {
    let food = []
    for(const item of data){
      if(item.id === props.item._id){
        food = item;
        break;
      }
    }
    if(food.length !== 0){
      if(food.size === size){
        await dispatch({type: "UPDATE", id: props.item._id, price: finalPrice, qty: qty})
      }else{
        await dispatch({type: "ADD", id: props.item._id, name: props.item.name, price: finalPrice, qty: qty, size: size, img: props.item.img});
      }
    }else{
      await dispatch({type: "ADD", id: props.item._id, name: props.item.name, price: finalPrice, qty: qty, size: size, img: props.item.img});
    }
    
    // console.log(data);
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: "18rem", height: "450px" }}>
          <img
            src={props.item.img}
            className="card-img-top object-fit-fill h-50"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{props.item.name}</h5>
            {/* <p className="card-text text-muted small">{props.item.description}</p> */}
            <div className="container w-100">
              <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option value={i + 1} key={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="d-inline h-100 fs-5">Price: ₹{finalPrice}/-</div>
            <hr />
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
