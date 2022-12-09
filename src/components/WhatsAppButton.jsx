import React from "react";
import { isBrowser } from "react-device-detect";
import WhatsAppLogo from "../assets/icons/whatsapp-logo";

const WhatsAppButton = () => (
  <div
    className="floating-button row"
    style={{ right: isBrowser ? "calc(50vw - 500px)" : 40, bottom: 120 }}
  >
    <button
      type="button"
      className="custom-button zoom-hover floating-shadow"
      style={{
        backgroundColor: "#4AC959",
        borderRadius: "100%",
        height: 50,
        width: 50,
      }}
      onClick={() => {
        window.open("https://wa.me/5561995100506", "_blank");
      }}
    >
      {WhatsAppLogo({ color: "white", height: 30, width: 30 })}
    </button>
  </div>
);

export default WhatsAppButton;
