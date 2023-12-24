export const convertImageToBlob = (image: string) => {
  const blob = dataUrlToBlob(image);
  const file = new File([blob], "myFileName", { type: "image/png" });
  function dataUrlToBlob(image: string) {
    const parts = image.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const byteCharacters = atob(parts[1]);
    const byteArrays = [];
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
    const byteArray = new Uint8Array(byteArrays);
    return new Blob([byteArray], { type: contentType });
  }
  return file;
};