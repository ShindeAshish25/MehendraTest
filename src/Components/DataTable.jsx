import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import Swal from 'sweetalert2'



function createData(ID, Date, Branch, Type, Amount, Bank, Requested, Status, Action) {
    return { ID, Date, Branch, Type, Amount, Bank, Requested, Status, Action };
}

const rows = [
    createData(124235, '19/04/2023', 'Thane', 'Full', '547890', 'CMV HDFC 1223562', 'Sharad Varma', 'Pending'),
    createData(563233, '20/12/2023', 'Navi Mumbai', 'Full', '246732', 'UYT SCB 632786433', 'Pramod Mehata', 'Approved'),
    createData(213352, '21/10/2023', 'Mumbai', 'Short', '553672', 'OIT HDFC 6732647333', 'Vikas Singh', 'rejected'),
    createData(565223, '22/09/2023', 'Kurla', 'Full', '197146', 'YTF SBI 654426545', 'Shard Shivastav', 'Approved'),
    createData(754833, '23/08/2023', 'Vile Parel', 'Full', '242178', 'PHS SBI 46465416', 'Vikas Mehata', 'Approved'),
    createData(367323, '24/07/2023', 'Lower Parel', 'Short', '643211', 'PDS HDFC 96233321', 'Shard kapoor', 'rejected'),
    createData(748333, '25/06/2023', 'Andheri', 'Full', '842789', 'GBG HDFC 3548225', 'Pramod Mahtur', 'Approved'),
    createData(367324, '26/05/2023', 'Byculls', 'Full', '642843', 'MGB SCB 8984252', 'Vikas Shethi', 'Approved'),
];

export default function AccessibleTable() {


    const [fromDate, setFromDate] = React.useState(null);
    const [toDate, setToDate] = React.useState(null);
    const [branch, setBranch] = React.useState('');
    const [type, setType] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [filteredRows, setFilteredRows] = React.useState(rows);

    const handleDateChange = (date, type) => {
        if (type === 'from') {
            setFromDate(date);
        } else {
            // Ensure "To" date is not less than "From" date
            if (fromDate && date.isBefore(dayjs(fromDate), 'day')) {
                return;
            }
            setToDate(date);
        }
    };


    const handleBranchChange = (event) => {
        setBranch(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    React.useEffect(() => {
        // Apply filters to rows based on the selected options
        const filtered = rows.filter((row) => {
            const date = new Date(row.Date.split('/').reverse().join('/'));
            const fromDateMatch = !fromDate || date >= fromDate;
            const toDateMatch = !toDate || date <= toDate;
            const branchMatch = !branch || row.Branch.toLowerCase() === branch.toLowerCase();
            const typeMatch = !type || row.Type.toLowerCase() === type.toLowerCase();
            const statusMatch = !status || row.Status.toLowerCase() === status.toLowerCase();

            return fromDateMatch && toDateMatch && branchMatch && typeMatch && statusMatch;
        });

        setFilteredRows(filtered);
    }, [fromDate, toDate, branch, type, status]);


    React.useEffect(() => {
        // Apply filters to rows based on the selected options
        const filtered = rows.filter((row) => {
            const date = dayjs(row.Date, { format: 'DD/MM/YYYY' }); // Parse date using dayjs
            const fromDateMatch = !fromDate || date.isSameOrAfter(fromDate, 'day');
            const toDateMatch = !toDate || date.isBefore(dayjs(toDate).add(1, 'day'), 'day');
            const branchMatch = !branch || row.Branch.toLowerCase() === branch.toLowerCase();
            const typeMatch = !type || row.Type.toLowerCase() === type.toLowerCase();
            const statusMatch = !status || row.Status.toLowerCase() === status.toLowerCase();

            return fromDateMatch && toDateMatch && branchMatch && typeMatch && statusMatch;
        });

        setFilteredRows(filtered);
    }, [fromDate, toDate, branch, type, status]);


    const handleDelete = (id) => {
        const updatedRows = filteredRows.filter((row) => row.ID !== id);
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'

                )
                setFilteredRows(updatedRows);
            }
        })
        // Filter out the row with the specified ID


    };

    return (
        <>
            <div className='main'>
                <h3 className='text-center'>Admin panel to view the data of transactions paid by the customer.</h3>
                <div className='filer-container my-5'>
                    <div className='row'>
                        <div className='col-auto'>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker label="Form" />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className='col-auto'>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="To"
                                            value={toDate}
                                            onChange={(date) => handleDateChange(date, 'to')}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className='col-auto'>
                            <div>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Branch</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={branch}
                                        onChange={handleBranchChange}
                                        label="Branch"
                                    >
                                        <MenuItem value="">
                                            <em>All</em>
                                        </MenuItem>
                                        <MenuItem value={'Thane'}>Thane</MenuItem>
                                        <MenuItem value={'navi mumbai'}>navi mumbai</MenuItem>
                                        <MenuItem value={'mumbai'}>mumbai</MenuItem>
                                        <MenuItem value={'kurla'}>kurla</MenuItem>
                                        <MenuItem value={'vile parle'}>vile parle</MenuItem>
                                        <MenuItem value={'lower parel'}>lower parel</MenuItem>
                                        <MenuItem value={'andheri'}>andheri</MenuItem>
                                        <MenuItem value={'byculla'}>byculla</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className='col-auto'>
                            <div>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={type}
                                        onChange={handleTypeChange}
                                        label="Type"
                                    >
                                        <MenuItem value="">
                                            <em>All</em>
                                        </MenuItem>
                                        <MenuItem value={'Full'}>Full</MenuItem>
                                        <MenuItem value={'Short'}>Short</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className='col-auto'>
                            <div>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={status}
                                        onChange={handleStatusChange}
                                        label="Status"
                                    >
                                        <MenuItem value="">
                                            <em>All</em>
                                        </MenuItem>
                                        <MenuItem value={'pending'}>Pending</MenuItem>
                                        <MenuItem value={'approved'}>Approved</MenuItem>
                                        <MenuItem value={'rejected'}>Rejected</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">

                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">Branch</TableCell>
                                <TableCell align="left">Type</TableCell>
                                <TableCell align="left">Amount (In Rupees)</TableCell>
                                <TableCell align="left">Bank</TableCell>
                                <TableCell align="left">Requested By (Employee Code )</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows
                                .sort((a, b) => { 
                                    const dateA = new Date(a.Date.split('/').reverse().join('/'));
                                    const dateB = new Date(b.Date.split('/').reverse().join('/')); 
                                    return dateA - dateB;  
                                })
                                .map((row) => (
                                    <TableRow 
                                        key={row.ID}>
                                        <TableCell component="th" scope="row">
                                            {row.ID}
                                        </TableCell>
                                        <TableCell align="left">{row.Date}</TableCell>
                                        <TableCell align="left">{row.Branch}</TableCell>
                                        <TableCell align="left">{row.Type}</TableCell>
                                        <TableCell align="left">{row.Amount}</TableCell>
                                        <TableCell align="left">{row.Bank}</TableCell>
                                        <TableCell align="left">{row.Requested}</TableCell>
                                        <TableCell align="left">{row.Status}</TableCell>
                                        <TableCell align="left"><HighlightOffOutlinedIcon className='currsore-pointer' onClick={() => handleDelete(row.ID)} /></TableCell>
                                    </TableRow>
                                ))} 
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </>

    );
}