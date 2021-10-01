import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function ColorTabs() {
    const [value, setValue] = React.useState('one');
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };
    return (
        <Box sx={{ width: '100%', padding: 0 }}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                sx={{
                    '.MuiTab-root': {
                        minWidth: '80px'
                    }
                }}
                aria-label="secondary tabs example"
            >
                <Tab label="Заказы" sx={{fontSize: `12px`, padding: 0, margin: 0}} />
                <Tab label="Промокоды" sx={{fontSize: `12px`, padding: 0, margin: 0}} />
                <Tab label="Адреса" sx={{fontSize: `12px`, padding: 0, margin: 0}} />
                <Tab label="Настройки" sx={{fontSize: `12px`, padding: 0, margin: 0}} />
            </Tabs>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    Item Three
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
};