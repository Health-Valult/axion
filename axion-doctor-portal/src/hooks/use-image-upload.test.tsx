import { renderHook, act } from '@testing-library/react-hooks';
import useImageUpload from './use-image-upload';

describe('useImageUpload', () => {
	it('should initialize with default values', () => {
		const { result } = renderHook(() => useImageUpload());
		expect(result.current.image).toBe(null);
		expect(result.current.uploading).toBe(false);
		expect(result.current.error).toBe(null);
	});

	it('should handle image upload', async () => {
		const { result } = renderHook(() => useImageUpload());
		const mockFile = new File(['dummy content'], 'example.png', {
			type: 'image/png',
		});

		await act(async () => {
			await result.current.uploadImage(mockFile);
		});

		expect(result.current.image).toBeTruthy();
		expect(result.current.uploading).toBe(false);
		expect(result.current.error).toBe(null);
	});

	it('should handle upload error', async () => {
		const { result } = renderHook(() => useImageUpload());
		const mockFile = new File(['dummy content'], 'example.txt', {
			type: 'text/plain',
		});

		await act(async () => {
			await result.current.uploadImage(mockFile);
		});

		expect(result.current.image).toBe(null);
		expect(result.current.uploading).toBe(false);
		expect(result.current.error).toBeTruthy();
	});
});
