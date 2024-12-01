import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import DocumentViewer from '@/components/DocumentViewer';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('DocumentViewer Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('renders the heading and description', () => {
    render(<DocumentViewer />);
    expect(screen.getByText(/View Documents/i)).toBeInTheDocument();
    expect(screen.getByText(/View the original document with its improved version side by side/i)).toBeInTheDocument();
  });

  test('fetches and displays documents', async () => {
    const mockDocumentData = {
      latest_document: {
        original_content: 'This is the original document.',
        improved_content: 'This is the improved document.',
        id: 123,
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockDocumentData));

    render(<DocumentViewer />);

    // Check loading states
    expect(screen.getByText(/Loading original document/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading improved document/i)).toBeInTheDocument();

    // Wait for documents to load
    await waitFor(() => {
      expect(screen.getByText(/This is the original document/i)).toBeInTheDocument();
      expect(screen.getByText(/This is the improved document/i)).toBeInTheDocument();
    });
  });

  

  test('triggers export to Word on button click', async () => {
    const mockDocumentData = {
      latest_document: {
        original_content: 'This is the original document.',
        improved_content: 'This is the improved document.',
        id: 123,
      },
    };

    const mockBlob = new Blob(['Test content'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

    fetchMock.mockResponseOnce(JSON.stringify(mockDocumentData));
    fetchMock.mockResponseOnce(mockBlob);

    render(<DocumentViewer />);

    // Wait for documents to load
    await waitFor(() => {
      expect(screen.getByText(/This is the improved document/i)).toBeInTheDocument();
    });

    // Mock URL.createObjectURL
    const mockCreateObjectURL = jest.fn();
    global.URL.createObjectURL = mockCreateObjectURL;

    // Click export button
    const exportButton = screen.getByText(/Download/i);
    fireEvent.click(exportButton);

    // Verify export API call
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'http://127.0.0.1:5555/export-document/123',
        expect.objectContaining({
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('JWT')}`,
          },
        })
      );
    });

    // Verify URL.createObjectURL called with blob
    expect(mockCreateObjectURL).toHaveBeenCalled();
  });
});
