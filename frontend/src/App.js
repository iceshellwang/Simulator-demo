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
  const sendPortfolio = async (e) => {
    //e.preventDefault();

    const portfolio = {

      stockCode: stockCode,
      share: Number(share),
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
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={modalOpen}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Total Return and Rate of Return:
        </DialogTitle>
        <DialogContent dividers>
          <Typography >
            $599 and {totalReturn}
          </Typography>
        </DialogContent>

      </Dialog>
    </div>
  );
}

export default App;
