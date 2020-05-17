import React from 'react';
import { Container, Box} from '@material-ui/core';
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import  SmartMeteoWrapper from '../SmartMeteo/SmartMeteoWrapper';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function AppRoot() {
  return (
    <ThemeProvider theme={theme}>

      {/* // Wrap all application (for background usage later) */}
      <Container maxWidth={false}>
        {/* Wrap all app content */}
        <Box my={6}>
          <Container component="main" maxWidth="md">
            <SmartMeteoWrapper />
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AppRoot;