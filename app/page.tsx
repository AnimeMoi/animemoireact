import Link from 'next/link';
// @ts-ignore
import NetTruyen from './images/Nettruyen.jpg';
// @ts-ignore
import SayHentai from './images/SayHentai.png';
import Image from 'next/image';

export default async function Home() {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="item" id="NetTruyen">
                <Link href={'/pages/NetTruyen'}>
                    <Image src={NetTruyen} alt={'NetTruyen'}></Image>
                </Link>
            </div>
            <div className="item" id="SayHentai">
                <Link href={'/pages/SayHentai'}>
                    <Image src={SayHentai} alt={'SayHentai'}></Image>
                </Link>
            </div>
        </div>
    );
}
