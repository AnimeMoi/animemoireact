export const TelegramEndpoint = "https://api.telegram.org/";
export const TelegramApi = "6690512898:AAFvzwcfQ1axac2bDrTpRZDU4p3gFh_Gh1A";

export async function getLinkTelegramImage(id: string): Promise<string> {
  const response = await fetch(
    `${TelegramEndpoint}bot${TelegramApi}/getFile?file_id=${id}`
  );
  const result = await response.json();
  return `${TelegramEndpoint}file/bot${TelegramApi}/${result.result.file_path}`;
}
