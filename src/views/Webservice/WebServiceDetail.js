  import React from "react";

  import {Tabs, Tab , Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button ,Card, CardHeader, CardContent, Paper} from '@mui/material';

  import { useParams } from "react-router-dom";

  import {
    getWSRequestById,
    createWSRequest,
    updateWSRequest,
  } from "../../api/ws-request-service";

  import { useEffect, useState } from "react";

  import { useNavigate } from "react-router-dom";
  import Parameter from "./Parameter";

  import { v4 as uuid } from "uuid";
  import Header from "./Header";
  import WSRequestData from "./WSRequestData";
  import WSResponseData from "./WSResponseData";

  const Details = () => {
    const navigate = useNavigate();

    const params = useParams();

    const wsrId = params.wsrId;

    const [webServiceRequest, setWebServiceRequest] = useState({});

    // const [url, setUrl] = React.useState("");
    // for url 

    const [isValidUrl, setIsValidUrl] = useState(false);
    const [urlValidationFeedback, setUrlValidationFeedback] = useState("");
  const [isValidName, setIsValidName] = useState(true)
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [httpMethod, setHttpMethod] = useState("");
    const [requestBody, setRequestBody] = useState("");
    const [contentType, setContentType] = useState("");
    const [accept, setAccept] = useState("");
    const [timeout, setTimeout] = useState(10);
    const [parameters, setParameters] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [requestData, setRequestData] = useState([]);
    const [responseData, setResponseData] = useState([]);
    const [isPrivate, setIsPrivate] = useState(false);
    const [
      disableCertificateAuthentication,
      setDisableCertificateAuthentication,
    ] = useState(false);
    const [description, setDescription] = useState("");

    const [activeKey, setActiveKey] = useState(1);
    const [tabClick, setTabClick] = useState(false);

    const urlRegex = /^(https?|ftp):\/\/((www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d{1,5})?(\/[^\s]*)?$/;

    

    const handleUrlChange = (event) => {
      const inputUrl = event.target.value;
      setUrl(inputUrl);
    
      // Simplified URL validation
      const isValid = /^https?:\/\/\S+$/.test(inputUrl);
      setIsValidUrl(isValid);
    
      if (isValid) {
        setUrlValidationFeedback("Looks good!");
      } else {
        setUrlValidationFeedback("Please enter a valid URL.");
      }
    };
    
  
    const getUUID = () => {
      const unique_id = uuid();
      return unique_id.slice(0, 8);
    };
  
    useEffect(() => {
      getWebServiceRequest();
    }, []);
  
    const getWebServiceRequest = () => {
      if (wsrId) {
        getWSRequestById(wsrId)
          .then((response) => {
            console.log(response);
            const webServiceRequest = response.data;
  
            setWebServiceRequest(webServiceRequest);
            setName(webServiceRequest.name);
            setHttpMethod(webServiceRequest.httpMethod);
            setUrl(webServiceRequest.url);
  
            setRequestBody(webServiceRequest.requestBody);
            setContentType(webServiceRequest.contentType);
            setAccept(webServiceRequest.accept);
            setTimeout(webServiceRequest.timeout);
  
            if (webServiceRequest.parameters.length == 0) {
              webServiceRequest.parameters.push({
                uuid: getUUID(),
                key: "",
                value: "",
              });
            }
  
            setParameters(webServiceRequest.parameters);
  
            if (webServiceRequest.headers.length == 0) {
              webServiceRequest.headers.push({
                uuid: getUUID(),
                key: "",
                value: "",
              });
            }
  
            setHeaders(webServiceRequest.headers);
  
            // if (webServiceRequest.requestData.length == 0) {
            //   webServiceRequest.requestData.push({
            //     uuid: getUUID(),
            //     name: "",
            //     isNewlyAdded : true,
            //     description : "",
            //     value: "",
            //   });
            // }
  
            setRequestData(webServiceRequest.requestData);
  
            if (webServiceRequest.responseData.length == 0) {
              webServiceRequest.responseData.push({
                uuid: getUUID(),
                name: "",
                isNewlyAdded: true,
                description: "",
                value: "",
              });
            }
            setResponseData(webServiceRequest.responseData);
  
            setIsPrivate(webServiceRequest.isPrivate);
            setDisableCertificateAuthentication(
              webServiceRequest.disableCertificateAuthentication
            );
  
            if (webServiceRequest.id) {
              console.log(webServiceRequest);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setHttpMethod("GET");
        addParameter();
        addHeader();
        addRequestData();
        addResponseData();
      }
    };
  
    const [validated, setValidated] = useState(false);
    // const handleSubmit = (event) => {
    //   const form = event.currentTarget;
    //   if (form.checkValidity() === false) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //   }
  
    //   if (tabClick) {
    //     setTabClick(false);
    //     return;
    //   }
  
    //   removeBlankParameters();
    //   removeBlankHeaders();
    //   removeBlankRequestData();
    //   removeBlankResponseData();
  
    //   if (wsrId) {
    //     // update
    //     setValidated(true);
    //     const wsRequest = {
    //       id: wsrId,
    //       name,
    //       httpMethod,
    //       url,
    //       requestBody,
    //       contentType,
    //       accept,
    //       timeout,
    //       parameters,
    //       headers,
    //       requestData,
    //       responseData,
    //       isPrivate,
    //       disableCertificateAuthentication,
    //     };
  
    //     updateWSRequest(wsrId, wsRequest)
    //       .then((response) => {
    //         navigate("/ws-request-list");
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   } else {
    //     // create
    //     setValidated(true);
  
    //     const wsRequest = {
    //       name,
    //       httpMethod,
    //       url,
    //       requestBody,
    //       contentType,
    //       accept,
    //       timeout,
    //       parameters,
    //       headers,
    //       requestData,
    //       responseData,
    //       isPrivate,
    //       disableCertificateAuthentication,
    //     };
    //     createWSRequest(wsRequest)
    //       .then((response) => {
    //         navigate("/ws-request-list");
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }
    // };
    const handleSubmit = (event) => {
      event.preventDefault();
    
      // Check if all required fields are filled in and valid
      if (!name || !url || !httpMethod || !isValidUrl) {
        console.log("Please fill in all required fields and ensure the URL is valid.");
        return;
      }
    
      console.log("Form submitted");
    

    
    
      if (tabClick) {
        setTabClick(false);
        return;
      }
  
      const noBlankParams = removeBlankParameters();
      const noBlankHeaders = removeBlankHeaders();
      const noBlankReqData = removeBlankRequestData();
      const noBlankResData = removeBlankResponseData();
  
      if (wsrId) {
        // update
        setValidated(true);
        const wsRequest = {
          id: wsrId,
          name,
          httpMethod,
          url,
          requestBody,
          contentType,
          accept,
          timeout,
          'parameters' : noBlankParams,
          'headers' : noBlankHeaders,
          'requestData' : noBlankReqData,
          'responseData' : noBlankResData,
          isPrivate,
          disableCertificateAuthentication,
        };
  
        updateWSRequest(wsrId, wsRequest)   
          .then((response) => {
            navigate("/wsrequest-list");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // create
        setValidated(true);
  
        const wsRequest = {
          name,
          httpMethod,
          url,
          requestBody,
          contentType,
          accept,
          timeout,
          'parameters' : noBlankParams,
          'headers' : noBlankHeaders,
          'requestData' : noBlankReqData,
          'responseData' : noBlankResData,
          isPrivate,
          disableCertificateAuthentication,
        };
        createWSRequest(wsRequest)
          .then((response) => {
            navigate("wsrequest-list");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
  
    const removeBlankParameters = () => {
      let params = [];
      for (let i = 0; i < parameters.length; i++) {
        if (
          (parameters[i].key !== "" && parameters[i].key !== null) ||
          (parameters[i].value !== "" && parameters[i].value !== null)
        ) {
          params = params.concat(parameters[i]);
        }
      }
      setParameters(params);
      return params;
    };
  
    const removeBlankHeaders = () => {
      let hdrs = [];
      for (let i = 0; i < headers.length; i++) {
        if (
          (headers[i].key !== "" && headers[i].key !== null) ||
          (headers[i].value !== "" && headers[i].value !== null)
        ) {
          hdrs = hdrs.concat(headers[i]);
        }
      }
      setHeaders(hdrs);
      return hdrs;
    };
  
    const removeBlankRequestData = () => {
      let reqData = [];
      for (let i = 0; i < requestData.length; i++) {
        if (
          (requestData[i].name !== "" && requestData[i].name !== null) ||
          (requestData[i].value !== "" && requestData[i].value !== null)
        ) {
          reqData = reqData.concat(requestData[i]);
        }
      }
      setRequestData(reqData);
      return reqData;
    };
  
    const removeBlankResponseData = () => {
      let resData = [];
      for (let i = 0; i < responseData.length; i++) {
        if (
          (responseData[i].name !== "" && responseData[i].name !== null) ||
          (responseData[i].value !== "" && responseData[i].value !== null)
        ) {
          resData = resData.concat(responseData[i]);
        }
      }
      setResponseData(resData);
      return resData;
    };
  
    const addParameter = () => {
      const params = parameters.concat({ uuid: getUUID(), key: "", value: "" });
      setParameters(params);
    };
  
    const removeParameter = (id) => {
      setParameters((oldv) => {
        return oldv.filter((p) => (p.id ? p.id !== id : p.uuid !== id));
      });
    };
  
    const setParameter = (id, key, value) => {
      const params = [...parameters];
      for (let i = 0; i < params.length; i++) {
        if (params[i].uuid === id || params[i].id === id) {
          params[i].key = key;
          params[i].value = value;
          break;
        }
      }
      setParameters(params);
    };
  
    const addHeader = () => {
      const hdrs = headers.concat({ uuid: getUUID(), key: "", value: "" });
      setHeaders(hdrs);
    };
  
    const removeHeader = (id) => {
      setHeaders((oldv) => {
        return oldv.filter((h) => (h.id ? h.id !== id : h.uuid !== id));
      });
    };
  
    const setHeader = (id, key, value) => {
      const hdrs = [...headers];
      for (let i = 0; i < hdrs.length; i++) {
        if (hdrs[i].uuid === id || hdrs[i].id === id) {
          if (key === "Content-Type") {
            setContentType(value);
          }
          if (key === "Accept") {
            setAccept(value);
          }
          hdrs[i].key = key;
          hdrs[i].value = value;
          break;
        }
      }
      setHeaders(hdrs);
    };
  
    const findRequestData = () => {
      findPatter(url ? url : "");
  
      if (parameters) {
        parameters.map((p) => {
          findPatter(p.value);
        });
      }
  
      if (headers) {
        headers.map((h) => {
          findPatter(h.value);
        });
      }
  
      findPatter(requestBody ? requestBody : "");
  
      console.log(requestData);
    };
  
    const findPatter = (text) => {
      const pattern = /\${[^}]*}/g;
  
      const matches = text.match(pattern);
  
      let reqData = [...requestData];
      if (matches) {
        for (let i = 0; i < matches.length; i++) {
          const index = reqData.findIndex((rd) => rd.name === matches[i]);
          if (index === -1) {
            reqData = reqData.concat({
              uuid: getUUID(),
              name: matches[i],
              isNewlyAdded: false,
              type: "String",
              description: "",
              value: "",
            });
          }
        }
      }
      setRequestData(reqData);
  
      if (reqData.length === 0) {
        addRequestData();
      }
    };
  
    const addRequestData = () => {
      const reqData = requestData.concat({
        uuid: getUUID(),
        name: "",
        type: "String",
        description: "",
        isNewlyAdded: true,
        value: "",
      });
      setRequestData(reqData);
    };
  
    const removeRequestData = (id) => {
      setRequestData((oldv) => {
        return oldv.filter((rd) => (rd.id ? rd.id !== id : rd.uuid !== id));
      });
    };
  
    const setParentRequestData = (id, name, value, description) => {
      const reqData = [...requestData];
      for (let i = 0; i < reqData.length; i++) {
        if (reqData[i].uuid === id || reqData[i].id === id) {
          reqData[i].name = name;
          reqData[i].value = value;
          reqData[i].description = description;
          break;
        }
      }
      setRequestData(reqData);
    };
  
    const addResponseData = () => {
      const resData = responseData.concat({
        uuid: getUUID(),
        name: "",
        type: "String",
        description: "",
        value: "",
      });
      setResponseData(resData);
    };
  
    const removeResponseData = (id) => {
      setResponseData((oldv) => {
        return oldv.filter((rd) => (rd.id ? rd.id !== id : rd.uuid !== id));
      });
    };
  
    const setParentResponseData = (id, name, value) => {
      const resData = [...responseData];
      for (let i = 0; i < resData.length; i++) {
        if (resData[i].uuid === id || resData[i].id === id) {
          resData[i].name = name;
          resData[i].value = value;
          resData[i].description = description;
          break;
        }
      }
      setResponseData(resData);
    };

    return (
      
      <form className="row g-3" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
      <Grid item xs={12}>
      
        <TextField
        id="webserviceName"
        label="Name"
          type="text"
          required
          value={name}
          onChange={(e) => {
            const onlyLetters = e.target.value.replace(/[^A-Za-z]/g, ''); 
            setName(onlyLetters);
          }}
          fullWidth
        />
        
      </Grid>

      <Grid item xs={2}>
        <FormControl fullWidth>
        <InputLabel id="http_method">Http-Method</InputLabel>
          <Select
          labelId="http_method"
            id="HttpMethod"
            value={httpMethod}
            label="Http-Method"
            onChange={(e) => setHttpMethod(e.target.value)}
          >
            <MenuItem value="GET">GET</MenuItem>
            <MenuItem value="POST">POST</MenuItem>
            <MenuItem value="PUT">PUT</MenuItem>
            <MenuItem value="DELETE">DELETE</MenuItem>
            <MenuItem value="PATCH">PATCH</MenuItem>
            <MenuItem value="HEAD">HEAD</MenuItem>
            <MenuItem value="OPTIONS">OPTIONS</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={10}>
      
        <TextField
          type="text"
          label='Url'
          required
          value={url}
          onChange={handleUrlChange}
          fullWidth
      
        />
      </Grid>


      <Grid container spacing={2}>
    <Grid item xs={12}>
      <Tabs 
        value={activeKey}
        onChange={(event, newValue) => {
          setActiveKey(newValue);
          setTabClick(true);
        }}
        aria-label="navigation tabs"
      >
        <Tab label="Params" value={1} />
        <Tab label="Headers" value={2} />
        <Tab label="Body" value={3} />
        <Tab label="Request Data" value={4} />
        <Tab label="Response Data" value={5} />
      </Tabs>
    </Grid>

    <Grid item xs={12}>
    {activeKey === 1 && (
    <Grid container className="p-1" justifyContent="center" alignItems="center" marginLeft={"20%"} >
      {parameters.map((parameter, index) => (
        <Parameter
          key={parameter.id ? parameter.id : parameter.uuid}
          id={parameter.id ? parameter.id : parameter.uuid}
          parameter={parameter}
          isLastIndex={parameters.length - 1 === index}
          addParameter={addParameter}
          setParameter={setParameter}
          removeParameter={removeParameter}
        />
      ))}
    </Grid>
  )}


  {activeKey === 2 && (
    <Grid container className="p-1" justifyContent="center" alignItems="center" marginLeft={"20%"} >
      {headers.map((header, index) => (
        <Header
          key={header.id ? header.id : header.uuid}
          id={header.id ? header.id : header.uuid}
          header={header}
          isLastIndex={headers.length - 1 === index}
          addHeader={addHeader}
          setHeader={setHeader}
          removeHeader={removeHeader}
        />
      ))}
    </Grid>
  )}
  {activeKey === 3 && (
    <textarea
      id="exampleFormControlTextarea1"
      label="Request Body"
      value={requestBody}
      onChange={(e) => setRequestBody(e.target.value)}
      rows={6}
      style={{ width: '100%', marginLeft:'10px' }} 
    />
  )}

  {activeKey === 4 && (
    <Grid container className="p-1" justifyContent="center" alignItems="center" marginLeft={"12%"} >
      {requestData.map((data, index) => (
        <WSRequestData
          key={data.id ? data.id : data.uuid}
          id={data.id ? data.id : data.uuid}
          requestData={data}
          isLastIndex={requestData.length - 1 === index}
          addRequestData={addRequestData}
          setRequestData={setParentRequestData}
          removeRequestData={removeRequestData}
        />
      ))}
    </Grid>
  )}
  {activeKey === 5 && (
    <Grid container className="p-1" justifyContent="center" alignItems="center" marginLeft={"15%"} >
      {responseData.map((data, index) => (
        <WSResponseData
          key={data.id ? data.id : data.uuid}
          id={data.id ? data.id : data.uuid}
          responseData={data}
          isLastIndex={responseData.length - 1 === index}
          addResponseData={addResponseData}
          setResponseData={setParentResponseData}
          removeResponseData={removeResponseData}
        />
      ))}
    </Grid>
  )}

    </Grid>
  </Grid>




  <Grid item xs={12}>
    <Grid container justifyContent="flex-end" alignItems="flex-end" spacing={2}>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          // disabled={!isValidUrl || !name || !httpMethod}
          onClick={handleSubmit}
        >
          {wsrId ? 'Update' : 'Create'}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          // onClick={handleClear}
        >
          Clear
        </Button>
      </Grid>
    </Grid>
  </Grid>

                </Grid>
              </form>
          
    );
  }

  function WebServiceDetail() {
    const params = useParams();
    const wsrId = params.wsrId;

    return (
      <Paper elevation={10}>

    
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardHeader title={`${wsrId ? "Update" : "Create"} Web Service Request Details`} />
            <CardContent>
              <Typography variant="body2" color="textSecondary" marginBottom={'20px'}>
                Complete Detail of the Web Service Request
              </Typography>
              {Details()}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Paper>
    );
  }
export default WebServiceDetail;