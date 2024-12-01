import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse incoming form data from the request
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Prepare the data to send to the Flask backend
    const uploadData = new FormData();
    uploadData.append('file', file);

    // Send the file to your Flask backend
    const response = await fetch('http://127.0.0.1:5555/documents/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('JWT')}` 
      },
      body: uploadData,
    });

    // Check if the response from the Flask backend is not OK
    if (!response.ok) {
      throw new Error('Error uploading document: ' + response.status);
    }

    // Parse the successful response from the backend
    const result = await response.json();

    // Return success response to the client
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    // Handle any errors and return a 500 status with the error message
    console.error('Error uploading document:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}