export default function base64ToFile(base64String) {
    const [prefix, base64Data] = base64String.split(',');
    const mimeType = prefix.match(/:(.*?);/)[1];

    // Chuyển đổi chuỗi base64 thành mảng byte
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Tạo đối tượng Blob từ mảng byte
    const blob = new Blob([byteArray], { type: mimeType });

    // Tạo URL từ Blob và trả về
    return URL.createObjectURL(blob);
}