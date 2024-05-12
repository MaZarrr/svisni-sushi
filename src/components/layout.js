import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Header from "./header"
import loadable from '@loadable/component'
import { Hidden } from "@mui/material";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import Vk, { CommunityMessages } from "react-vk";
import useLocalStorage from '../utils/useLocalStorage'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { setUserData, setOpenModalDelivery } from "../reducers/app";
import { connect } from 'react-redux';
// const ScrollTop = loadable(() => import('./common/ScrollTop'));
const Footer = loadable(() => import('./footer'));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'clamp(300px, 50%, 70%)',
  bgcolor: 'background.paper',
  border: 'none',
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// const VK = isBrowser && window.VK
// isBrowser && VK.Widgets.CommunityMessages("vk_community_messages", 161250465);
// isBrowser && VK.Widgets.Group("vk_groups", {mode: 3}, 161250465)
const Layout = (
  { children, location: { pathname = "" }, setUser, setModalDelivery, isOpenDelivery
}) => {
  const [valueStorage, setValue] = useLocalStorage('userSettings')
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = (params) => {
    setValue({...valueStorage, adressDelivery: params.adressDelivery, isOpenDelivery: params.isOpenDelivery})
    setUser(params)
    setModalDelivery(false);
  };

  useEffect(() => {
    if(!valueStorage?.adressDelivery) {
      // setValue({ adressDelivery: null })
      setModalDelivery(true)
    } else {
      setUser({adressDelivery: valueStorage.adressDelivery})
      setModalDelivery(false)
    }
  }, [])


  return (
    <ErrorBoundary>    
            <Modal
                    open={isOpenDelivery}
                    sx={{
                        color: '#fff',
                    }}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
              <Box sx={{ ...style, outline: 'none' }}>
              {/* <Box sx={{ ...style, width: 200 }}> */}
                <h4 style={{ color: 'black', textAlign: 'center' }} id="child-modal-title">Выберите адрес для заказа:</h4>
                {/* <p style={{ color: 'black' }} id="child-modal-description">
                    Выберите адрес заказа:
                </p> */}
                <Button  sx={{ backgroundColor: 'antiquewhite', fontSize: '13px', width: '100%', padding: '15px', fontWeight: 600}}  onClick={() => handleClose({adressDelivery: 'Валуйки', isOpenDelivery: false})}>Валуйки, <br /> ул.Толстого 16/2</Button>
                <div style={{ height: 20 }}></div>
                <Button sx={{ backgroundColor: 'antiquewhite', width: '100%', fontSize: '13px', padding: '15px', fontWeight: 600}} onClick={() => handleClose({adressDelivery: 'Уразово', isOpenDelivery: false})}>Уразово, <br /> ул.Красная Площадь 30А</Button>
              </Box>
              </Modal>

    <Vk apiId={161250465}>
      <CommunityMessages 
        groupId={161250465}
        options={{
          disableButtonTooltip : 1
        }}>
      </CommunityMessages>
    </Vk>
    <Header/>
    <div style={{
      // maxWidth: `1920px`,
      backgroundColor: "#fafafa",
      margin: `0 auto`,
      minHeight: `100vh`
    }}>
    <div style={{height: 75, width: 100}} />
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 0 }} />
    <main>
      {children}
    </main>
    {/* { pathname !== "/korzina/" &&
          pathname !== "/korzina/order" &&
          pathname !== "/korzina/order/order-processed" &&
          pathname !== "/korzina/order/order-success" &&
          <ScrollTop />
        } */}
    </div>
  <div>
  </div>
  
  <Hidden smDown>
    <Footer/>
  </Hidden>
  </ErrorBoundary>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string
};

const mapStateToProps = (state) => ({
  adressDelivery: state.app.userSettings?.adressDelivery,
  isOpenDelivery: state.app.userSettings?.isOpenDelivery,
});

const mapDispatchToProps = {
  setUser: setUserData,
  setModalDelivery: setOpenModalDelivery
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
