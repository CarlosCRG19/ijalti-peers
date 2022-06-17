import React from 'react';
import { useTheme, InputLabel } from '@mui/material';
import TagsInput from '../TagsInput';

const TagsInputWithLabel = (props) => {
  const {
    id,
    label,
    ...tagsInputProps
  } = props;

  const { palette } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <InputLabel htmlFor={id} sx={{ color: palette.black }}>{label}</InputLabel>
      <TagsInput
        hiddenLabel
        id={id}
        margin="none"
        {...tagsInputProps}
      />
    </div>
  );
};

export default TagsInputWithLabel;
