import React, { useEffect } from 'react'
// import * as FileSaver from "file-saver";
// import * as XLSX from "xlsx";
import Pdf from "react-to-pdf";

const ref = React.createRef();


export const ExportToPDF = ({ apiData, fileName }) => {
  console.log('apiDataapiDataapiData', apiData);
  return (
      <div>
        <div style={{ marginBottom: 10 }}></div>
        <div ref={ref}>
            {apiData}
        </div>
        <Pdf targetRef={ref} filename={fileName}>
          {({ toPdf }) => (
            <button onClick={toPdf}>
              Pdf download
            </button>
          )}
        </Pdf>
      </div>
  );
};