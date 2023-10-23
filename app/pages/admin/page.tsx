"use client";
import { useCallback, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import moment from "moment";
import Image from "next/image";
import "./page.css";
import Thumbnail from "../../public/assets/images/thumbnail.png";
import { BookOpen, Sparkle } from "@phosphor-icons/react";
import { User } from "firebase/auth";
import { AddComic } from "../../components/admin/add-comic/AddComic";
import { DeleteComic } from "../../components/admin/delete-comic/DeleteComic";
import { DeleteChapter } from "../../components/admin/delete-chapter/DeleteChapter";
import { UpdateComic } from "../../components/admin/update-comic/UpdateComic";
import { GetTotal } from "../../utils/manga";
import { useGlobalContext } from "../../globalContext/store";
import { Domain } from "../../domain";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Page() {
  // Check role begin
  const [isAdmin, setIsAdmin] = useState(true);
  const [date, setDate] = useState<number>(Date.now());
  const [monthlyChartData, setMonthlyChartData] = useState({
    datasets: [],
  });
  const { user } = useGlobalContext();
  checkRole(user, setIsAdmin);

  useEffect(() => {
    if (!isAdmin) return redirect("/");
  }, [isAdmin]);
  // Check role end

  const [totalComic, setTotalComic] = useState("N/A");
  useEffect(() => {
    const fetchData = async () => {
      let result = await GetTotal();
      setTotalComic(result.toString());
    };

    fetchData().then(() => {});
  }, []);

  const getMonthlyChartData = useCallback(async () => {
    const _date = new Date(date);
    await fetch(
      `${Domain}Admin/ChartDataComicUpdateByMonth?month=${
        _date.getMonth() + 1
      }/1/${_date.getFullYear()}`
    )
      .then((response) => response.json())
      .then((data) => setMonthlyChartData(data));
  }, [date]);

  useEffect(() => {
    getMonthlyChartData().then(() => {
      console.log("Get data success");
    });
  }, [getMonthlyChartData]);

  return (
    <div className="w-screen min-h-screen flex justify-center bg-richBlack">
      <div className="hidden w-[1200px] h-full tablet:flex flex-col justify-start items-center gap-[50px] px-[40px]">
        {user === null ? (
          <div className="w-full h-screen flex justify-center items-center">
            <p className="text-base text-lightGray font-semibold">
              Bạn không thể truy cập được vào AnimeMoi Dashboard vì bạn không
              phải là quản trị viên!
            </p>
          </div>
        ) : (
          <>
            <div className="w-full h-[85px] flex flex-row justify-between items-center bg-richBlack border-b-[1px] border-white/[.15] sticky top-0 z-[100]">
              <p className="text-xl text-lightGray font-semibold">
                AnimeMoi Dashboard
              </p>
              <p className="text-sm text-white/75 font-semibold">
                Xin chào, {user!.displayName}
              </p>
            </div>
            <div className="w-full h-fit flex flex-col gap-[25px] mb-2.5">
              <div className="w-full h-fit flex flex-row justify-between items-center">
                <p className="text-sm text-white/75 font-semibold uppercase tracking-wide">
                  Tổng quan
                </p>
                <a
                  href="https://animemoi.budibase.app/app/animemoi"
                  className="text-sm text-lightGray font-semibold cursor-pointer scale-in"
                >
                  Sửa database
                </a>
              </div>
              <div className="w-full h-fit flex flex-row gap-[28px]">
                <div className="w-[260px] h-[90px] flex flex-row items-center gap-[20px] px-[16px] rounded-[16px] bg-[#0f0f0f] border-[1px] border-white/[.07] cursor-pointer move-up">
                  <div className="w-[44px] h-[44px] flex justify-center items-center rounded-full bg-lightGray">
                    <BookOpen color="#000" weight="bold" size={20} />
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <p className="text-sm text-white/75 font-medium">
                      Tổng số truyện
                    </p>
                    <p className="text-lg text-lightGray font-semibold">
                      {totalComic}
                    </p>
                  </div>
                </div>
                <div className="w-[260px] h-[90px] flex flex-row items-center gap-[20px] px-[16px] rounded-[16px] bg-[#0f0f0f] border-[1px] border-white/[.07] cursor-pointer move-up">
                  <div className="w-[44px] h-[44px] flex justify-center items-center rounded-full bg-lightGray">
                    <Sparkle color="#000" weight="bold" size={20} />
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <p className="text-sm text-white/75 font-medium">
                      Tổng số nguồn truyện
                    </p>
                    <p className="text-lg text-lightGray font-semibold">7</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-fit flex flex-col gap-[25px] mb-2.5">
              <div className="w-full h-fit flex flex-row justify-between items-center">
                <p className="text-sm text-white/75 font-semibold uppercase tracking-wide">
                  Số truyện cập nhật trong tháng {new Date(date).getMonth() + 1}
                </p>
                <p className="text-sm text-lightGray font-semibold">
                  {moment().format("DD/MM/YYYY")}
                </p>
              </div>
              <div className="w-full h-fit p-5 rounded-[16px] bg-[#0f0f0f] border-[1px] border-white/[.07] cursor-pointer move-up">
                <Line
                  data={monthlyChartData}
                  options={{}}
                  className="w-full h-[320px]"
                />
              </div>
            </div>
            <div className="w-full h-fit flex flex-col gap-[25px] mb-2.5">
              <p className="text-sm text-white/75 font-semibold uppercase tracking-wide">
                Chỉnh sửa
              </p>
              <div className="flex flex-row justify-start gap-[40px]">
                <AddComic />
                <div className="flex flex-col gap-[40px]">
                  <DeleteComic />
                  <DeleteChapter />
                  <UpdateComic />
                </div>
              </div>
            </div>
            <div className="w-full h-[100px]"></div>
          </>
        )}
      </div>
      <div className="tablet:hidden w-full h-full flex flex-col justify-center items-center gap-[50px]">
        <div className="w-[400px] h-[200px] relative overflow-hidden">
          <Image
            src={Thumbnail}
            alt=""
            fill
            sizes="(max-width: 390px) 100vw, (max-width: 1080px) 50vw"
            className="object-contain"
          />
        </div>
        <div className="w-[350px] flex flex-col gap-[8px] text-center">
          <p className="text-[22px] text-lightGray font-semibold">
            AnimeMoi mobile is coming
          </p>
          <p className="text-sm text-white/75 font-medium">
            In the meantime, please use the desktop site for the best experience
          </p>
        </div>
      </div>
    </div>
  );
}

function checkRole(user: User | null, setIsAdmin: any) {
  user?.getIdTokenResult().then((idTokenResult) => {
    if (!idTokenResult.claims.admin) {
      setIsAdmin(false);
    }
  });
}
