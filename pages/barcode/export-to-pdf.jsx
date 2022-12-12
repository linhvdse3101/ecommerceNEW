import React, { useEffect } from 'react'
import Pdf from "react-to-pdf";

const ref = React.createRef();


const ExportToPDF = ({ apiData, fileName }) => {
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


export default ExportToPDF;

