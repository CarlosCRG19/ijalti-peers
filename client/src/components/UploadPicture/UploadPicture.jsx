import { AddPhotoAlternate } from '@mui/icons-material';
import { Alert, Fab, Typography } from '@mui/material';
import { React, useState } from 'react'

const UploadPicture = ({ label, onchange }) => {

  const [picture, setPicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [alert, setAlert] = useState(null);

  let base64Picture = '';
  const handlePictureUpload = (e) => {
    const pictureInfo = e.target.files[0];

    if (!pictureInfo) {
      return;
    }

    if (pictureInfo.type != 'image/png' && pictureInfo.type != 'image/jpeg') {
      setAlert("Favor de subir un archivo .jpg o .png");
      return;
    }

    setAlert(null);
    setPicturePreview(URL.createObjectURL(pictureInfo));
    setPicture(generateBase64(pictureInfo));
  };

  const onLoad = pictureString => {
    onchange('profilePicture', pictureString);
  }

  const generateBase64 = (inputPicture) => {
    const reader = new FileReader();
    reader.readAsDataURL(inputPicture);
    reader.onload = () => {
      onLoad(reader.result);
    }
  }

  return (
    <div>
      <Typography variant='subtitle' sx={{ marginRight: '32px' }}>{label}</Typography>
      <input
        accept='image/*'
        id='upload-image'
        type='file'
        multiple
        onChange={handlePictureUpload}
        style={{ display: 'none' }}
      />
      <label htmlFor='upload-image'>
        <Fab component='span' color='primary'>
          <AddPhotoAlternate />
        </Fab>
      </label>
      {alert &&
        <Alert severity='warning' sx={{ margin: '16px' }}>{alert}</Alert>}
      {picturePreview ?
        <div>
          <img
            src={picturePreview}
            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '100%' }}
          />
        </div>
        :
        <div style={{
          width: '150px',
          height: '150px',
          backgroundColor: 'gray',
          borderRadius: '100%',
        }}
        />
      }
    </div>
  )
};

export default UploadPicture;