import React, { useState, useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import 'date-fns';
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
    const url = "/send-portfolio";
    const response = await axios.get(url);
    console.log(response)
    setLastReturn(response.data.lastPortfolio.totalReturn)
    setLastRateOfReturn(response.data.lastPortfolio.rateOfReturn)
    setSecondModalOpen(true)


  };
  const sendPortfolio = async (e) => {
    //e.preventDefault();
    const portfolio = {
      // stockInfo:[
      //   {stockCode:stockCode,share: Number(share)},
      //   {stockCode:secondStockCode,share:Number(secondShare)},
      //   {stockCode:thirdStockCode,share: Number(thirdShare)}
      // ],
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
    setTotalReturn(response.data.totalReturn)
    setRateOfReturn(response.data.rateOfReturn)
    setModalOpen(true)


  };

  return (
    <div >
      <AppBar position="static" >
        <main><h1 style={{ textAlign: 'center' }}>Stock Trading Simulator</h1></main>
      </AppBar>
      <div style={{ margin: '60px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', }}>
          <div >
            <TextField id="filled-basic" label="Stock Code" Value={stockCode} onChange={handleStockCodeChange} />
          </div>
          <div >
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
        <div>
          <div >
            <TextField id="filled-basic" label="Stock Code" Value={secondStockCode} onChange={handleSecondStockCodeChange} />
          </div>
          <div >
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
        <div>
          <div >
            <TextField id="filled-basic" label="Stock Code" Value={thirdStockCode} onChange={handleThirdStockCodeChange} />
          </div>
          <div >
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


      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
            <div>
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
              /></div>
          </MuiPickersUtilsProvider >
        </div>

      </div>
      <div>
        <Button variant="contained" color="primary" onClick={sendPortfolio}>Submit</Button>
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={getLastPortfolio}>Show Last Portfolio</Button>
      </div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={modalOpen}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Finance Statistics
        </DialogTitle>
        <DialogContent dividers>
          <Typography >
            <h3>Total Return :  {totalReturn}</h3>
            <h3>Rate of Return: {rateOfReturn}</h3>
          </Typography>
        </DialogContent>

      </Dialog>
      <Dialog onClose={handleSecondModalClose} aria-labelledby="customized-dialog-title" open={secondModalOpen}>
        <DialogTitle id="customized-dialog-title" onClose={handleSecondModalClose}>
          Last Portfolio Statistics
        </DialogTitle>
        <DialogContent dividers>
          <Typography >
            <h3>Total Return :  {lastReturn}</h3>
            <h3>Rate of Return: {lastRateOfReturn}</h3>
          </Typography>
        </DialogContent>

      </Dialog>
    </div>
  );
}

export default App;
