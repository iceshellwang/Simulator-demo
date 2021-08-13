import React, { useState } from "react";
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Spinner from './Spinner'
import 'date-fns';
import Alert from '@material-ui/lab/Alert';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";
import { Dialog, Typography, DialogTitle, DialogContent } from '@material-ui/core';

function App() {


  const [stockCode, setStockCode] = useState("");
  const [share, setShare] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [secondStockCode, setSecondStockCode] = useState("");
  const [secondShare, setSecondShare] = useState();

  const [thirdStockCode, setThirdStockCode] = useState("");
  const [thirdShare, setThirdShare] = useState();

  const [modalOpen, setModalOpen] = useState(false);
  const [totalReturn, setTotalReturn] = useState()
  const [rateOfReturn, setRateOfReturn] = useState()
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [lastReturn, setLastReturn] = useState()
  const [lastRateOfReturn, setLastRateOfReturn] = useState()
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState(false);
  const handleShareChange = ({ target }) => {
    setShare(target.value);
  };
  const handleStockCodeChange = ({ target }) => {
    setStockCode(target.value);
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };


  const handleSecondShareChange = ({ target }) => {
    setSecondShare(target.value);
  };
  const handleSecondStockCodeChange = ({ target }) => {
    setSecondStockCode(target.value);
  };

  const handleThirdShareChange = ({ target }) => {
    setThirdShare(target.value);
  };
  const handleThirdStockCodeChange = ({ target }) => {
    setThirdStockCode(target.value);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleSecondModalClose = () => {
    setSecondModalOpen(false);
  };


  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  const getLastPortfolio = async (e) => {
    setAlert(false)
    setSpinner(true)
    const url = "/send-portfolio";
    const response = await axios.get(url);
    console.log(response)
    if (response.data.status === "success") {
      setLastReturn(response.data.lastPortfolio.totalReturn)
      setLastRateOfReturn(response.data.lastPortfolio.rateOfReturn)
      setSecondModalOpen(true)
      setSpinner(false)
    }
    else {
      setAlert(true)
      setSpinner(false)
    }


  };
  const sendPortfolio = async (e) => {
    //e.preventDefault();

    setSpinner(true)
    const portfolio = {

      stockCode1: stockCode,
      share1: Number(share),
      stockCode2: secondStockCode,
      share2: Number(secondShare),
      stockCode3: thirdStockCode,
      share3: Number(thirdShare),
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
    };

    const url = "/send-portfolio";
    const response = await axios.post(url, portfolio);
    if (response.data.status === "success") {
      setTotalReturn(response.data.totalReturn)
      setRateOfReturn(response.data.rateOfReturn)
      setModalOpen(true)
      setSpinner(false)
    }
    else {
      setAlert(true)
      setSpinner(false)
    }


  };

  return (
    <div >
      <AppBar position="static" >
        <main><h1 style={{ textAlign: 'center' }}>Stock Trading Simulator</h1></main>
      </AppBar>
      {alert && <Alert severity="error">Please enter valid stock code or share or refresh this page</Alert>}
      <div style={{ margin: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ marginRight: '20px' }}>
          <div >
            <TextField id="filled-basic" label="Stock Code" Value={stockCode} onChange={handleStockCodeChange} />
          </div>
          <div style={{ paddingTop: '32px' }}>
            <TextField
              id="standard-number"
              label="Share Number"
              type="number"
              Value={share}
              onChange={handleShareChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>


        </div>
        {/* second stock selection  */}
        <div style={{ marginRight: '20px' }}>
          <div >
            <TextField id="filled-basic" label="Stock Code" Value={secondStockCode} onChange={handleSecondStockCodeChange} />
          </div>
          <div style={{ paddingTop: '32px' }}>
            <TextField
              id="standard-number"
              label="Share Number"
              type="number"
              Value={secondShare}
              onChange={handleSecondShareChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

        </div>
        {/* third stock selection  */}
        <div style={{ marginRight: '20px' }}>
          <div >
            <TextField id="filled-basic" label="Stock Code" Value={thirdStockCode} onChange={handleThirdStockCodeChange} />
          </div>
          <div style={{ paddingTop: '32px' }} >
            <TextField
              id="standard-number"
              label="Share Number"
              type="number"
              Value={thirdShare}
              onChange={handleThirdShareChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

        </div>
        <div >
          <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <div style={{ marginTop: '5px' }}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="End Date"
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </div>
          </MuiPickersUtilsProvider >
        </div>
      </div>

      {spinner && <Spinner />}
      <div style={{ margin: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ marginRight: '150px' }}>
          <Button variant="contained" color="primary" onClick={sendPortfolio}>Submit</Button>
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={getLastPortfolio}>Show Last Portfolio</Button>
        </div>
      </div>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={modalOpen}>
        <div style={{ width: '400px', textAlign: 'center', }}>
          <DialogTitle onClose={handleClose}>
            <h3>Return Statistics</h3>
          </DialogTitle>
          <DialogContent dividers>
            <Typography >
              <h3>Total Return :  {totalReturn}</h3>
              <h3>Rate of Return: {rateOfReturn}</h3>
            </Typography>
          </DialogContent>
        </div>
      </Dialog>
      <Dialog onClose={handleSecondModalClose} aria-labelledby="customized-dialog-title" open={secondModalOpen}>
        <div style={{ width: '400px', textAlign: 'center', }}>
          <DialogTitle onClose={handleSecondModalClose} >
            <h3>Last Portfolio Statistics</h3>
          </DialogTitle>
          <DialogContent dividers>
            <Typography >
              <h3>Total Return :{lastReturn}</h3>
              <h3>Rate of Return:{lastRateOfReturn}</h3>
            </Typography>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export default App;
