export function ceilMaxPage(totalAuctions: number, auctionsOnPage: number) {
  return Math.ceil(totalAuctions / auctionsOnPage);
}
export async function urlToFile(url: string, fileName: string) {
  try {
    // Fetch the data from the URL
    const response = await fetch(url);
    const blob = await response.blob();

    // Convert the Blob to a File object
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  } catch (error) {
    console.error("Error fetching or converting the URL to a file:", error);
    throw error;
  }
}
