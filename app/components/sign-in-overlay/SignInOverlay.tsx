import React, { useState } from "react";
import "../../globals.css";
import "./SignInOverlay.css";
import Image from "next/image";
import GoogleLogo from "../../images/brand-logo/google-logo.png";
import GithubLogo from "../../images/brand-logo/github-logo.png";
import XLogo from "../../images/brand-logo/x-logo.png";
import auth, {
	GithubProvider,
	GoogleProvider,
	XProvider,
} from "../auth/Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";

type SignInProps = {
	onAuthStateChanged: (user: any) => void;
};

const SignInOverlay: React.FC<SignInProps> = ({ onAuthStateChanged }) => {
	const [isEmailClicking, setIsEmailClicking] = useState(false);

	const handleEmailClick = () => {
		let email = document.getElementById("email") as HTMLInputElement | null;
		let password = document.getElementById(
			"password"
		) as HTMLInputElement | null;
		if (password === null || email === null) return;
		signInWithEmailAndPassword(auth, email.value, password.value)
			.then((result) => {
				onAuthStateChanged(result.user);
			})
			.catch((error: FirebaseError) => {
				var err = document.getElementById("error");
				if (err === null) return;
				err.innerText = error.message;
				console.error(error);
			});
		setIsEmailClicking(true);
	};

	const handleGoogleClick = () => {
		signInWithPopup(auth, GoogleProvider)
			.then((result) => {
				onAuthStateChanged(result.user);
			})
			.catch((error: FirebaseError) => {
				var err = document.getElementById("error");
				if (err === null) return;
				err.innerText = error.message;
				console.error(error);
			});
	};

	const handleXClick = () => {
		signInWithPopup(auth, XProvider)
			.then((result) => {
				onAuthStateChanged(result.user);
			})
			.catch((error: FirebaseError) => {
				var err = document.getElementById("error");
				if (err === null) return;
				err.innerText = error.message;
				console.error(error);
			});
	};

	const handleGithubClick = () => {
		signInWithPopup(auth, GithubProvider)
			.then((result) => {
				onAuthStateChanged(result.user);
			})
			.catch((error: FirebaseError) => {
				var err = document.getElementById("error");
				if (err === null) return;
				err.innerText = error.message;
				console.error(error);
			});
	};

	return (
		<div className="w-[335px] h-fit flex flex-col gap-[20px] p-4 bg-richBlack/[.65] backdrop-blur-[10px] rounded-[34px] border-[1.5px] border-white/20 overlay-show">
			<p className="text-lg text-lightGray font-semibold text-center">
				Đăng nhập
			</p>
			<div className="w-full grid gap-[13px] grid-cols-2">
				<div
					className="w-[145px] h-[46px] flex flex-row justify-center items-center gap-[10px] rounded-full border-[1.5px] border-white/20 cursor-pointer move-up"
					onClick={handleGoogleClick}
				>
					<Image src={GoogleLogo} alt={""} className="w-[16px] h-[16px]" />
					<span className="text-sm text-lightGray font-semibold">Google</span>
				</div>
				<div
					className="w-[145px] h-[46px] flex flex-row justify-center items-center gap-[10px] rounded-full border-[1.5px] border-white/20 cursor-pointer move-up"
					onClick={handleXClick}
				>
					<Image src={XLogo} alt={""} className="w-[16px] h-[16px]" />
					<span className="text-sm text-lightGray font-semibold">X</span>
				</div>
				<div
					className="move-up w-[145px] h-[46px] flex flex-row justify-center items-center gap-[10px] rounded-full border-[1.5px] border-white/20 cursor-pointer"
					onClick={handleGithubClick}
				>
					<Image src={GithubLogo} alt={""} className="w-[16px] h-[16px]" />
					<span className="text-sm text-lightGray font-semibold">Github</span>
				</div>
			</div>
			<div className="w-full h-fit flex flex-row items-center gap-[10px]">
				<div className="w-full h-px bg-white/[.15]"></div>
				<span className="text-xs text-white opacity-75 font-semibold">
					hoặc
				</span>
				<div className="w-full h-px bg-white/[.15]"></div>
			</div>
			<div className="w-full h-fit flex flex-col items-start gap-[10px]">
				<span className="text-sm text-lightGray font-semibold">Email*</span>
				<div className="w-full h-[48px] flex px-[16px] rounded-full border-[1.5px] border-white/20">
					<input
						id="email"
						type="email"
						placeholder="you@example.com"
						className="w-full bg-transparent border-none outline-none placeholder:text-sm placeholder:text-white/60 placeholder:font-medium text-sm text-white/75 font-medium"
					/>
				</div>
			</div>
			<div className="w-full h-fit flex flex-col items-start gap-[10px]">
				<span className="text-sm text-lightGray font-semibold">Mật khẩu*</span>
				<div className="w-full h-[48px] flex px-[16px] rounded-full border-[1.5px] border-white/20">
					<input
						id="password"
						type="password"
						className="w-full bg-transparent border-none outline-none text-sm text-white/75 font-medium"
					/>
				</div>
				<div id="error" className="text-white"></div>
			</div>
			<div
				className="w-full h-[48px] mt-[20px] flex justify-center items-center rounded-full bg-lightGray cursor-pointer move-up"
				onClick={handleEmailClick}
			>
				<span className="text-sm text-black font-semibold">Đăng nhập</span>
			</div>
		</div>
	);
};

export default SignInOverlay;
