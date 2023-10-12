import React, { useState } from "react";
import "../../globals.css";
import "./AccountSettingOverlay.css";
import auth from "../auth/Firebase";
import { ButtonPrimary } from "../button/button";

type AccountSettingProps = {
	onEdit: () => void;
	onClose: () => void; // Thêm onClose prop để ẩn overlay
};

const AccountSetting: React.FC<AccountSettingProps> = ({ onEdit, onClose }) => {
	const [isEditClicking, setIsEditClicking] = useState(false);

	const handleEditClick = () => {
		onEdit();
		setIsEditClicking(true);
	};

	function logout() {
		auth
			.signOut()
			.then(() => {
				console.log("Logout success");
				onClose(); // Gọi onClose để ẩn overlay sau khi đăng xuất
			})
			.catch((e) => {
				console.error(e);
			});
	}

	return (
		<div className="w-[280px] h-fit flex flex-col gap-5 p-4 bg-richBlack/60 backdrop-blur-[10px] rounded-3xl border-[1.5px] border-white/20 overlay-show">
			<div className="w-full h-fit flex flex-row justify-between items-center">
				<div className="w-full h-fit flex flex-col justify-start gap-[5px]">
					<p className="text-sm text-lightGray font-semibold">
						{auth.currentUser?.displayName}
					</p>
					<p className="text-xs text-white opacity-75 font-medium">
						{auth.currentUser?.email}
					</p>
				</div>
				<ButtonPrimary text="Sửa" func={handleEditClick}></ButtonPrimary>
			</div>
			<div className="w-full h-px bg-white/10"></div>
			<div className="w-full h-fit flex flex-col justify-start gap-5">
				<p className="text-sm text-lightGray font-semibold">Nguồn truyện</p>
				<div className="w-full h-fit flex flex-col gap-5">
					<label className="w-full h-fit flex flex-row items-center gap-3">
						<input
							type="checkbox"
							name="option"
							className="w-[16px] h-[16px]"
						/>
						<p className="text-xs text-lightGray font-medium">BaoTangTruyen</p>
					</label>
					<label className="w-full h-fit flex flex-row items-center gap-3">
						<input
							type="checkbox"
							name="option"
							className="w-[16px] h-[16px]"
						/>
						<p className="text-xs text-lightGray font-medium">CManga</p>
					</label>
					<label className="w-full h-fit flex flex-row items-center gap-3">
						<input
							type="checkbox"
							name="option"
							className="w-[16px] h-[16px] accent-white"
						/>
						<p className="text-xs text-lightGray font-medium">Yurineko</p>
					</label>
				</div>
			</div>
			<div className="w-full h-fit flex justify-end">
				<div
					className="scale-up flex px-[14px] py-[10px] rounded-full bg-lightGray cursor-pointer"
					onClick={logout}
				>
					<p className="text-xs text-black font-semibold">Đăng xuất</p>
				</div>
			</div>
		</div>
	);
};

export default AccountSetting;
