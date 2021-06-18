import React, { useState, useEffect } from "react";
import db from "../firebase";

import "../styles/PlansScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const user = useSelector(selectUser);
  //get user subscription
  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);
  //get subscriptions from db
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};

        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();

          const priceSnap = await productDoc.ref.collection("prices").get();

          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);
  //use stripe, checkout process
  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error accured ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51Hel8RLbqPZftEhvGUSD6GaUVxNTnqMirfO3fSxCp9tJNA1zmn6Vj8xGhe4Tx1S3BqUjMpfjk1sDlhue0m0FemtX00YEJZFRPJ"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plansScreen">
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "planScreen_plan--disabled"
            } plansScreen__plan`}
          >
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? `Current Package` : "subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
