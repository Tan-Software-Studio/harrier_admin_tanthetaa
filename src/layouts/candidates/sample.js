import * as React from 'react';
import { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Sample() {


    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const candidate =
    {
        desired_employer_type: "1,2,4,5,6",
        desired_employer_type_list: [
            { title: 'ADMIN', id: 1 },
            { title: 'GUEST', id: 2 },
            { title: 'Law Firm', id: 4 },
            { title: 'ALSP', id: 5 },
            { title: 'Tech Vendor', id: 6 }
        ]
    }

    const TestData = candidate?.desired_employer_type_list

    const [state, setState] = useState([{ title: 'ADMIN', id: 1 }])

    // const onSelectCheck = (e) => {
    //     setState(e.target.value)
    // }

    const [age, setAge] = useState('Dooler');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const CurrancyOptions = [
        { label: '$', currancy: "Dooler" },
        { label: "₹", currancy: "Rupees" },
        { label: "€", currancy: "Euro" },
        { label: "£", currancy: "Pound" },
    ];

    return (
        <DashboardLayout>
            <Select
                value={age}
                label="Age"
                onChange={handleChange}
            >
                {CurrancyOptions && CurrancyOptions.map((currancy) => {
                    return (

                        <MenuItem value={currancy.currancy}>{currancy.label}</MenuItem>
                    )
                })}

            </Select>

            {/* <Autocomplete
                multiple={true}
                options={candidate?.desired_employer_type_list}
                getOptionLabel={
                    (option) => (option.title)
                }
                value={state}
                onChange={(e, value) => {
                    setState(value);
                }}
                renderInput={
                    params => (
                        <TextField {...params} variant="outlined" />
                    )
                } /> */}
            {/* <Autocomplete
                multiple
                options={TestData}
                disableCloseOnSelect
                defaultValue={state}
                getOptionLabel={(option) => option.title}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.title}
                    </li>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField {...params} />
                )}
            /> */}


        </DashboardLayout>

    );
}
