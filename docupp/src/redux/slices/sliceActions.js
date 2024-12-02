import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const baseUrl = 'http://127.0.0.1:5555/'

export const fetchDocument = createAsyncThunk(
    'document/fetch',
    async () => {
      const response = await axios.get(`${baseUrl}/documents/latest`, {
        withCredentials: false,
      })
      return response
    },
  )