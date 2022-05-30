import React from 'react';
import axios from 'axios';
import {
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { render, fireEvent, userEvent } from '../../../utils/test-utils';

import PostJobOffer from '../PostJobOffer';

const mockJobOffer = {
  title: 'Software Developer',
  city: 'Zapopan',
  monthlySalary: '30000',
  description: 'Skilled engineer able to create a web app from scratch',
};

axios.get = vi.fn();
axios.post = vi.fn();

const mockAxiosGet = ({ resolvedValue, rejectedValue }) => {
  if (resolvedValue) {
    axios.get.mockResolvedValue(resolvedValue);
    return;
  }

  axios.get.mockRejectedValue(rejectedValue);
};

const mockAxiosPost = ({ resolvedValue, rejectedValue }) => {
  if (resolvedValue) {
    axios.post.mockResolvedValue(resolvedValue);
    return;
  }

  axios.post.mockRejectedValue(rejectedValue);
};

describe('Views', () => {
  describe('PostJobOffer', () => {
    beforeAll(() => {
      mockAxiosGet({
        resolvedValue: {
          data: [],
        },
      });
    });

    it('should render form properly', () => {
      const { getAllByRole, getByText, getByRole } = render(<PostJobOffer />);

      expect(getByText(/Publica una oferta/)).toBeInTheDocument();
      expect(getAllByRole('textbox')).toHaveLength(3);
      expect(getAllByRole('combobox')).toHaveLength(2);
      expect(getByRole('button', { name: 'Borrar' })).toBeInTheDocument();
      expect(getByRole('button', { name: 'Publicar' })).toBeInTheDocument();
    });

    it('should POST new job offer when form is completed', async () => {
      const { getByLabelText, getByRole } = render(<PostJobOffer />);

      mockAxiosPost({ resolvedValue: { data: {} } });

      await userEvent.click(getByRole('button', { name: 'Publicar' }));

      expect(axios.post).not.toHaveBeenCalled();

      await userEvent.type(getByLabelText(/Título/), mockJobOffer.title);
      await userEvent.type(getByLabelText(/Ubicación/), mockJobOffer.city);
      await userEvent.type(getByLabelText(/Descripción/), mockJobOffer.description);
      // type number input doesn't work with userEvent, thus, the change must be forced
      fireEvent.change(getByLabelText(/Salario mensual/), { target: { value: mockJobOffer.monthlySalary } });

      await userEvent.click(getByRole('button', { name: 'Publicar' }));

      expect(axios.post).toHaveBeenCalledWith('/job-offers', {
        title: mockJobOffer.title,
        city: mockJobOffer.city,
        description: mockJobOffer.description,
        salary: mockJobOffer.monthlySalary,
        requiredAbilities: [],
        suggestedAbilities: [],
      });
    });
  });
});
