import { AddPhotoAlternate } from '@mui/icons-material';
import { Alert, Button, Fab, InputLabel, Typography } from '@mui/material';
import { React, useState } from 'react'

const UploadPicture = ({ label, onchange }) => {

  const [picturePreview, setPicturePreview] = useState(null);
  const [alert, setAlert] = useState(null);

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
    generateBase64(pictureInfo);
  };

  const onLoad = pictureString => {
    setPicturePreview(pictureString);
    onchange('profilePicture', pictureString);
    return pictureString
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
      <InputLabel sx={{ color: '#000' }}>Foto de perfil</InputLabel>
      <div style={{ display: 'grid', placeItems: 'center' }}>
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
          <div className='imagePlaceHolder' style={{
            width: '150px',
            height: '150px',
            backgroundColor: 'gray',
            borderRadius: '100%',
          }}
          />
        }
        <input
          accept='image/*'
          id='upload-image'
          type='file'
          multiple
          onChange={handlePictureUpload}
          style={{ display: 'none' }}
        />
        <Button
          component='label'
          variant='contained'
          sx={{ mt: 1 }}
          startIcon={<AddPhotoAlternate />}
        >
          Subir imagen
          <input
            accept='image/*'
            id='upload-image'
            type='file'
            multiple
            onChange={handlePictureUpload}
            style={{ display: 'none' }}
          />
        </Button>
      </div>
    </div>
  )
};

export default UploadPicture;