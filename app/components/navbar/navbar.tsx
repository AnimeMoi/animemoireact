import '../../globals.css';
import './navbar.css';
import Image from 'next/image';
import {House, List, MagnifyingGlass} from "@phosphor-icons/react";
import Avatar from '../../images/Avatar.png';

interface Props {
    isLogin: boolean;
    homeIcon: boolean;
}

export const NavBar = ({isLogin, homeIcon}: Props) => {
    return <div className={`NavBar flex justify-between`}>
        <div className={`Left Logo cursor-pointer flex items-center`}>ANIMEMOI</div>

        <div className={`Center flex items-center`}>
            {homeIcon ?
                <div className={`Home cursor-pointer flex justify-center border border-white border-opacity-20`}>
                    <House size={15}/>
                </div> : <></>}
            <div className={`SearchBar flex items-center`}>
                <div className={`icon`}>
                    <MagnifyingGlass size={15}/>
                </div>
                <div className={`SearchQuery`}>
                    <input type="text" placeholder={`Tìm truyện`}/>
                </div>
            </div>
            <div className={`Genres flex cursor-pointer items-center`}>
                <List size={15}/>
                <div>Thể loại</div>
            </div>
        </div>

        <div className={`Right flex items-center`}>
            {isLogin ?
                <div className={`flex items-center`}>
                    <div className={`LoginButton cursor-pointer`}>
                        Đăng nhập
                    </div>
                    <div className={`RegisterButton cursor-pointer`}>
                        Đăng ký
                    </div>
                </div> : <Image src={Avatar} alt={`Avatar`}/>
            }
        </div>
    </div>
}