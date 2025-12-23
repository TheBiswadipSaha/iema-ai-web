import React from "react";

export const buyCredits = async (amount, postReq) => {
  console.log("Buying credits for amount:", amount);

  // Load Razorpay script
  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const loaded = await loadRazorpay();
  if (!loaded) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const userData = JSON.parse(sessionStorage.getItem("user"));
  const token= sessionStorage.getItem("token")

  const options = {
    key: "rzp_test_RkJWx59iPfx6C5", // 🔴 replace with real Razorpay key
    amount: amount * 100,
    currency: "INR",
    name: "IEMA AI",
    description: `${amount} Credits Purchase`,
    handler: async function (response) {
      console.log("Payment success:", response);

      try {
        // Call your backend verification API
        const verifyResponse = await postReq(
          "api/payments/verify-payment",
          token, // pass token if needed
          {
            subscriptionAmount: amount,
            razorpay_payment_id: response.razorpay_payment_id,
          }
        );

        if (verifyResponse?.data?.token) {
          // Store token in localStorage and sessionStorage
          localStorage.setItem("unknown", verifyResponse.data.token);
          sessionStorage.setItem("unknown", verifyResponse.data.token);

          // Show token somewhere in UI
          alert(`Payment successful! Token: ${verifyResponse.data.token}`);
        } else {
          alert("Payment verified but no token received from server.");
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
        alert("Payment verification failed. Please contact support.");
      }
    },
    theme: { color: "#10B981" },
    prefill: { name: userData?.name, email: userData?.email },
    modal: { backdropclose: false, escape: false },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};