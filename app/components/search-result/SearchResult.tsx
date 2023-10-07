import Link from "next/link";
import "../../globals.css";
import "./SearchResult.css";
import Image from "next/image";
import { SearchResultProps } from "../../types/App";

const SearchResult: React.FC<SearchResultProps> = ({ results }) => {
	return (
		<div className="w-[380px] max-h-[444px] flex flex-col flex-grow gap-5 p-[15px] bg-richBlack/80 backdrop-blur-[10px] rounded-3xl border-[1.5px] border-white/20 overflow-y-scroll no-scrollbar overlay-show">
			{results.map((result) => {
				const chapterNumber =
					(result.lastChapterTitle &&
						result.lastChapterTitle.match(/(\d+(\.\d+)?)/)?.[0]) ||
					"N/A";

				return (
					<Link
						className="flex flex-row gap-[15px]"
						key={result.id}
						href={`/pages/details/NetTruyen?id=${result.id}`}
					>
						<div className="w-[60px] h-[88px] relative overflow-hidden">
							<Image
								src={result.cover}
								alt={result.titles[0]}
								fill
								className="object-cover rounded-[9px] outline outline-2 outline-white/20 outline-offset-[-2px]"
								sizes="1200px"
							/>
						</div>
						<div className="h-fit flex flex-col grow shrink-0 basis-0 gap-[5px] overflow-hidden">
							<p className="w-full text-sm text-lightGray font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
								{result.titles[0]}
							</p>
							<p className="w-full text-xs text-white/75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
								Tác giả: {result.author ?? "Đang cập nhật"}
							</p>
							<p className="text-xs text-white/75 font-medium">
								Chapter {chapterNumber ?? "Đang cập nhật"}
							</p>
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default SearchResult;
