import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MeetingPage from './MeetingPage';
import NewMeetingPage from './newMeetingPage';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className='flex flex-col items-center  w-2/3 '
      {...other}
    >
      {value === index && (
        <div  className='flex flex-col items-center'>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='flex flex-col items-center mt-4'>

        <Tabs value={value} onChange={handleChange} >
          <Tab label="Create Meeting" {...a11yProps(0)} />
          <Tab label="My Meetings" {...a11yProps(1)} />
        </Tabs>

      <CustomTabPanel  value={value} index={0}>
        <NewMeetingPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MeetingPage />
      </CustomTabPanel>
    </div>
  );
}
