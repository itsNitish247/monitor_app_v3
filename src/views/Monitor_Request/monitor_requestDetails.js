


import React ,
{useEffect, useState } from "react";
import {
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CInputGroup,
  CFormSelect,
  CButton,
} from "@coreui/react";
import { useParams } from "react-router-dom";


import { useNavigate } from "react-router-dom";
import ServerMonitorDetails from "./ServerRequest";





const Details = () => {
  const navigate = useNavigate();
  const params = useParams();
  const requestId = params.requestId;
  console.log(requestId);

  


}
function MonitorRequestDetails() {
  return (
    <CRow>
      <CCol xs={11}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>Server Monitor Request Details</h4>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Complete Detail of the Servere Monitor Requests
            </p>
            <Details />
         
            <CCol md={12} className="mt-3">
        <CRow>


          {/* Server Monitor Request Section */}

        
          <CCol md={12}>
            <ServerMonitorDetails />
          </CCol>


    
          
        </CRow>
      </CCol>
</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default MonitorRequestDetails;



