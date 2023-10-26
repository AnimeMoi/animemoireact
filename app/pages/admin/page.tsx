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
import { useGlobalContext } from "../../globalContext/store";
import { Domain } from "../../domain";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default function Page() {
  const [date, setDate] = useState<number>(Date.now());
  const [monthlyChartData, setMonthlyChartData] = useState({
    datasets: [],
  });
  const [comicChartData, setComicChartData] = useState<{
    labels: any[];
    datasets: any[];
  }>({
    labels: [],
    datasets: [],
  });
  const [totalComic, setTotalComic] = useState("N/A");

  // Check role begin
  const [isAdmin, setIsAdmin] = useState(true);
  const { user } = useGlobalContext();
  checkRole(user, setIsAdmin);

  useEffect(() => {
    if (!isAdmin) return redirect("/");
  }, [isAdmin]);
  // Check role end

  // Begin get data comic update
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
  // End get data comic update

  // Start get data comic
  const getColor = (source: string) => {
    switch (source) {
      case "nettruyen":
        return "#ff4f00";
      case "yurineko":
        return "#ff7f33";
      case "sayhentai":
        return "#ffa366";
      case "hentaivn":
        return "#ffc299";
    }
  };

  const getComicChartData = useCallback(async () => {
    await fetch(`${Domain}AnimeMoi/TotalComicEachHost`)
      .then((response) => response.json())
      .then((data: any) => {
        setTotalComic(data["total"].toString());

        const result = [
          data["nettruyen"],
          data["yurineko"],
          data["sayhentai"],
          data["hentaivn"],
        ];
        setComicChartData({
          labels: ["NetTruyen", "Yurineko", "SayHentai", "HentaiVN"],
          datasets: [
            {
              data: result,
              backgroundColor: [
                getColor("nettruyen"),
                getColor("yurineko"),
                getColor("sayhentai"),
                getColor("hentaivn"),
              ],
              borderWidth: 0,
            },
          ],
        });
      });
  }, []);

  useEffect(() => {
    getComicChartData().then(() => {
      console.log("Get data success");
    });
  }, [getComicChartData]);
  // End get data comic

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
                    <p className="text-lg text-lightGray font-semibold">6</p>
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
              <div className="w-full h-fit p-5 rounded-[16px] bg-[#0f0f0f] border-[1px] border-white/[.07] cursor-pointer move-up mb-5">
                <Line
                  data={monthlyChartData}
                  options={{
                    elements: {
                      point: {
                        radius: (context) =>
                          context.chart.data.datasets[context.datasetIndex].data
                            .length -
                            1 ===
                          context.dataIndex
                            ? 3
                            : 0,
                      },
                    },
                  }}
                  className="w-full max-h-[320px]"
                />
              </div>
              <div className="w-[440px] h-fit rounded-[16px] bg-[#0f0f0f] border-[1px] border-white/[.07] cursor-pointer move-up">
                <Doughnut
                  data={comicChartData}
                  options={{
                    cutout: 60,
                    plugins: {
                      legend: {
                        labels: {
                          padding: 25,
                        },
                        display: true,
                        position: "right",
                      },
                    },
                    layout: {
                      padding: 40,
                    },
                  }}
                  className="w-full max-h-[280px]"
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
