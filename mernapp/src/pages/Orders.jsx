import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function Orders() {
  const [orderData, setOrderData] = useState([]);
  const fetchMyOrder = async () => {
    try {
      const res = await axios.post(`${window.location.origin}/api/myOrderData`, {
        email: localStorage.getItem("userEmail"),
      });
      console.log(res.data.orderData);
      if (res && res.status === 200) {
        setOrderData(res.data.orderData);
      }
    } catch (error) {
      alert("Server Error.");
    }
  };
  useEffect(() => {
    fetchMyOrder();
  }, []);
  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row mb-3">
          {orderData.length > 0 ? (
            orderData
              .slice(0)
              .reverse()
              .map((item) => {
                return item.map((arrayData) => {
                  return (
                    <div>
                      {arrayData.Order_date ? (
                        <div className="fs-3 m-3">
                          {arrayData.Order_date}
                          <hr />
                        </div>
                      ) : (
                        <div className="col-12 col-md-6 col-lg-3">
                          <div
                            className="card mt-3"
                            style={{
                              width: "16rem",
                              maxHeight: "360px",
                            }}
                          >
                            <img
                              src={arrayData.img}
                              className="card-img-top"
                              alt="..."
                              style={{
                                height: "120px",
                                objectFit: "fill",
                              }}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{arrayData.name}</h5>
                              <div
                                className="container w-100 p-0"
                                style={{ height: "38px" }}
                              >
                                <span className="m-1">{arrayData.qty}</span>
                                <span className="m-1">{arrayData.size}</span>
                                <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                  ₹{arrayData.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                });
              })
          ) : (
            <div>Order Something...</div>
          )}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}
