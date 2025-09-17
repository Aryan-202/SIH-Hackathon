import { useEffect } from "react";
import { io } from "socket.io-client";

export default function LiveLocation() {
  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      console.log("✅ Connected to live location server");
    });

    socket.on("location_update", (data) => {
      console.log("📍 Location update", data);
      // TODO: update map marker here
    });

    socket.on("alert", (alert) => {
      console.log("🚨 Alert", alert);
    });

    socket.on("geofence_breach", (evt) => {
      console.log("⚠️ Geofence breach", evt);
    });

    return () => {
      socket.disconnect(); // cleanup
    };
  }, []);

  return <div>Live Location Tracking Dashboard</div>;
}
