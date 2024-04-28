export const useFileDownloader = (downloadUrl: string) => {
  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.download = "cropped-image.png";
      link.href = downloadUrl;
      link.click();
    }
  };

  return { handleDownload };
};
