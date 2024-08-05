import { Card } from "@mui/material"
import { styled } from "@mui/styles"

export const CardStyle = styled(Card)(({ theme }) => ({
    maxWidth: `350px`,
    margin: `20px auto 10px auto`,
    [theme.breakpoints.up('1900')]: {
        maxWidth: `400px`,
    },
    [theme.breakpoints.down('1500')]: {
        maxWidth: `300px`,
    },
    // [theme.breakpoints.down('1281')]: {
    //     maxWidth: `300px`,
    // },
    // [theme.breakpoints.down('600')]: {
    //     maxWidth: `300px`,
    // },
    // [theme.breakpoints.down('475')]: {
    //     maxWidth: `300px`,
    // },
    // [theme.breakpoints.down('376')]: {
    //     maxWidth: `270px`,
    // },
    // [theme.breakpoints.down('340')]: {
    //     maxWidth: `300px`,
    // },
}))