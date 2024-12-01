import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DocumentUpload from "../DocumentUpload";


// Mock the fetch API
global.fetch = jest.fn();

describe("DocumentUpload Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the upload form correctly", () => {
    render(<DocumentUpload />);
    expect(screen.getByText(/Upload Your Document/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Upload Document/i })).toBeInTheDocument();
    expect(screen.getByText(/Supported formats include/i)).toBeInTheDocument();
  });

  test("updates state when a file is selected", () => {
    render(<DocumentUpload />);
    const fileInput = screen.getByLabelText(/upload file/i);
    const testFile = new File(["test content"], "testFile.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(fileInput, { target: { files: [testFile] } });

    expect(screen.getByText("Selected file: testFile.pdf")).toBeInTheDocument();
  });

  test("shows loading spinner and disables button during upload", async () => {
    render(<DocumentUpload />);
    const uploadButton = screen.getByRole("button", { name: /Upload Document/i });
    const fileInput = screen.getByLabelText(/upload file/i);

    const testFile = new File(["test content"], "testFile.pdf", { type: "application/pdf" });

    fireEvent.change(fileInput, { target: { files: [testFile] } });
    fireEvent.click(uploadButton);

    // Simulate loading
    expect(screen.getByText("Uploading")).toBeInTheDocument();
    expect(uploadButton).toBeDisabled();
  });

  test("makes a POST request with the selected file", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Success" }),
    });

    render(<DocumentUpload />);
    const uploadButton = screen.getByRole("button", { name: /Upload Document/i });
    const fileInput = screen.getByLabelText(/upload file/i);

    const testFile = new File(["test content"], "testFile.pdf", { type: "application/pdf" });

    fireEvent.change(fileInput, { target: { files: [testFile] } });
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:5555/documents/upload", expect.any(Object));
    });
  });

  test("prevents upload if no file is selected", () => {
    render(<DocumentUpload />);
    const uploadButton = screen.getByRole("button", { name: /Upload Document/i });

    // Spy on alert to capture its calls
    jest.spyOn(window, "alert").mockImplementation(() => {});

    fireEvent.click(uploadButton);

    expect(window.alert).toHaveBeenCalledWith("Please select a file first.");
  });
});
