"use client"
import React, {useCallback, useState} from "react";
import {sendPasswordResetEmail} from "@firebase/auth";
import auth from "../auth/Firebase";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [result, setResult] = useState("");

    const forgotPassword = useCallback(() => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('Password reset email sent!');
                setResult("Password reset email sent!");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorMessage.includes('invalid-email')) {
                    setResult('Email is invalid');
                    return;
                }
                if (errorMessage.includes('user-not-found')) {
                    setResult('User not found');
                    return;
                }
                setResult(`${errorCode} - ${errorMessage}`);
            });
    }, [email]);

    return (
        <div
            className="w-[335px] h-fit flex flex-col gap-[20px] p-4 bg-richBlack/[.65] backdrop-blur-[10px] rounded-[34px] border-[1px] border-white/20 overlay-show">

            {result ? (
                <div className={`text-white text-sm text-center`}>
                    <h1 className="text-lg text-lightGray font-semibold text-center">Thông báo</h1>
                    <br/>
                    <p>{result}</p>
                </div>
            ) : (
                <>
                    <p className="text-lg text-lightGray font-semibold text-center">
                        Quên mật khẩu
                    </p>
                    <div className="w-full h-fit flex flex-col items-start gap-[10px]">
                        <span className="text-sm text-lightGray font-semibold">Email*</span>
                        <div className="w-full h-[48px] flex px-[16px] rounded-full border-[1.5px] border-white/20">
                            <input
                                type="text"
                                placeholder="you@example.com"
                                className="w-full bg-transparent border-none outline-none placeholder:text-sm placeholder:text-white/60 placeholder:font-medium text-sm text-white/75 font-medium"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div
                        className="w-full h-[48px] mt-[20px] flex justify-center items-center rounded-full bg-lightGray cursor-pointer move-up"
                        onClick={forgotPassword}
                    >
                        <p className="text-sm text-black font-semibold">Xác nhận</p>
                    </div>
                </>
            )}

        </div>

    )
}