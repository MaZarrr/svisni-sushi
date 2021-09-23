import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import makeStyles from '@mui/styles/makeStyles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(3), // положение от низа
    right: theme.spacing(1),
    zIndex: '1002'
  },
  scrollToPanel: {
    position: 'absolute',
    top: theme.spacing(0),
  },
}));

function ScrollTop(props) {
  const { window, children } = props;
  const classes = useStyles();
  
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

export default function BackToTop(props) {
    const classes = useStyles();
    return (
      <React.Fragment>
        <Toolbar className={classes.scrollToPanel} id="back-to-top-anchor" />
        <ScrollTop windows={props.windows}>
          <Fab color="secondary" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </React.Fragment>
    );
  }

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

