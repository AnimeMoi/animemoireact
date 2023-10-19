export const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return "Hoàn thành";
    case 2:
      return "Đang tiến hành";
    case 3:
      return "Tạm dừng";
    case 4:
      return "Không xác định";
  }
};
