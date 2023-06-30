import React, {useEffect, forwardRef, useState} from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import { msgAction } from '../../features/msgHandler/msgHandler';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = () => {

  const dispatch = useAppDispatch();

  const { successMsg, errorMsg } = useAppSelector((state) => state.msg);


  const [openSuccessMsg, setOpenSuccessMsg] = useState(false);

  const [openErrorMsg, setOpenErrorMsg] = useState(false);

  useEffect(() => {
    if (successMsg) {
      setOpenSuccessMsg(true);
      setOpenErrorMsg(false);
    } 
  }, [successMsg]);

  useEffect(() => {
    
    if (errorMsg) {
      setOpenErrorMsg(true);
      setOpenSuccessMsg(false);
    }
  }, [errorMsg]);

  const handleCloseSuccessMsg = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(msgAction.resetMsg());
    setOpenSuccessMsg(false);
  };

  const handleCloseErrorMsg = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(msgAction.resetMsg());
    setOpenErrorMsg(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      { errorMsg &&
        <Snackbar open={openErrorMsg} autoHideDuration={6000} onClose={handleCloseErrorMsg}>
          <Alert onClose={handleCloseErrorMsg} severity="error" sx={{ width: '100%' }}>
            {errorMsg}
          </Alert>
        </Snackbar>      
      }

      { successMsg &&
        <Snackbar open={openSuccessMsg} autoHideDuration={6000} onClose={handleCloseSuccessMsg}>
          <Alert onClose={handleCloseSuccessMsg} severity="success" sx={{ width: '100%' }}>
            {successMsg}
          </Alert>
        </Snackbar>      
      }

      
    </Stack>
  );
}

export default Notification;