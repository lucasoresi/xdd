import apiService from './api';

interface UploadResponse {
  message: string;
  url: string;
  path: string;
}

class UploadService {
  // Upload image file
  async uploadImage(file: File): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error uploading image');
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Delete image
  async deleteImage(path: string): Promise<void> {
    try {
      await apiService.delete('/upload/image', { path });
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
}

export default new UploadService();