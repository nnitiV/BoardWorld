import { useEffect, useRef } from "react";

export function useDeviceId() {
const deviceIdRef = useRef<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      let id = localStorage.getItem("deviceId");
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("deviceId", id);
      }
      deviceIdRef.current = id;
    }
  }, []);

  return deviceIdRef;
}