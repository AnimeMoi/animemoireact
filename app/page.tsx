import Link from 'next/link';
import Image from 'next/image';
// @ts-ignore
import NetTruyen from './images/Nettruyen.jpg';
import SayHentai from './images/SayHentai.png';
import HentaiVN from './images/HentaiVN.png';

export default async function Home() {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="item" id="NetTruyen">
                <Link href={'/pages/home/NetTruyen'}>
                    <Image src={NetTruyen} alt={'NetTruyen'}></Image>
                </Link>
            </div>
            <div className="item" id="SayHentai">
                <Link href={'/pages/home/SayHentai'}>
                    <Image src={SayHentai} alt={'SayHentai'}></Image>
                </Link>
            </div>
            <div className="item" id="HentaiVN">
                <Link href={'/pages/home/HentaiVN'}>
                    <Image src={HentaiVN} alt={'HentaiVN'}></Image>
                </Link>
            </div>
        </div>
    );
}
