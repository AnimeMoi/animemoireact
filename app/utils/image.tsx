export const TelegramEndpoint = "https://api.telegram.org/";
export const TelegramApi = "6458222681:AAEy9Q-qHskCvymzy3JYWxu-uM1jdC16cdk";

export async function getLinkTelegramImage(id: string): Promise<string> {
	const response = await fetch(
		`${TelegramEndpoint}bot${TelegramApi}/getFile?file_id=${id}`
	);
	const result = await response.json();
	return `${TelegramEndpoint}file/bot${TelegramApi}/${result.result.file_path}`;
}
