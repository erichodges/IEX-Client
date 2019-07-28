import { useSnackbar } from 'notistack';
import React from 'react';


function Snack() {
  const { enqueueSnackbar } = useSnackbar();
    enqueueSnackbar('Snack Called');

}

export default function CallSnack() {
  return (
      <>
        <Snack />
      </>
  );
}
