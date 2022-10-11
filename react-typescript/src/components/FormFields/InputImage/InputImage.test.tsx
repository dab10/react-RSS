import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputImage from './InputImage';

test('upload image', async () => {
  render(
    <InputImage
      handleChange={() => {}}
      formErrors={{
        image: '',
      }}
    />
  );
  const file = new File(['new file'], 'newFile.png', { type: 'image/png' });
  const imageInput = screen.getByLabelText(/image:/i) as HTMLInputElement;
  userEvent.upload(imageInput, file);
  if (imageInput) {
    const files = imageInput.files;
    expect(files).toHaveLength(1);
  }
});
