import { createTheme } from "@mui/material";
//import { light } from "@mui/material/styles/createPalette";

/* Create Custom Shapes & Colors */
export const theme = createTheme ({
    /* Custom Colors (corrolate to school) */
    palette: {
        // Univerity Blue
        primary: {
            main: "#002E5A",
        },
        // Cougar Blue, Spirit Blue
        secondary: {
            main: "#0062a5",
            light: "#3ab5e8"
        },
        // 20 Gray
        otherColor: { 
            main: "#d1d3d4"           
        }
    }
})