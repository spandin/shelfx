import {
  BrowserMultiFormatReader,
  DecodeHintType,
  Result,
} from "@zxing/library";
import { useEffect, useMemo, useRef } from "react";

const useZxing = ({
  constraints = {
    audio: false,
    video: {
      facingMode: "environment",
    },
  },
  hints,
  timeBetweenDecodingAttempts = 300,
  onResult = () => {},
  onError = () => {},
} = {}) => {
  const ref = useRef(null);

  const reader = useMemo(() => {
    const instance = new BrowserMultiFormatReader(hints);
    instance.timeBetweenDecodingAttempts = timeBetweenDecodingAttempts;
    return instance;
  }, [hints, timeBetweenDecodingAttempts]);

  useEffect(() => {
    if (!ref.current) return;
    reader.decodeFromConstraints(constraints, ref.current, (result, error) => {
      if (result) onResult(result);
      if (error) onError(error);
    });
    return () => {
      reader.reset();
    };
  }, [ref, reader]);

  return { ref };
};

export const BarcodeScanner = ({ onResult = () => {}, onError = () => {} }) => {
  const { ref } = useZxing({ onResult, onError });
  return (
    <div>
      <video ref={ref} />
      result: {ref.current}
    </div>
  );
};
