import { Scanner } from "@codesaursx/react-scanner";

const BarCodeScanner = (scannerModalActive, setScannerModalActive) => {
  return (
    <div className="flex flex-col gap-2">
      <h3>Сканирование</h3>
      <p className="text-sm text-darkG-100">Наведите камеру на штрих код</p>
      <Scanner
        delay={500}
        onUpdate={(e, data) => {
          if (data) {
            setValue("code", data.getText());
            setScannerModalActive(false);
          }
        }}
        stopStream={scannerModalActive === true ? true : false}
      />
    </div>
  );
};

export { BarCodeScanner };
