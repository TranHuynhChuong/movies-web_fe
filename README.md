# MoviesWeb Frontend (Tùy Tiện)

Frontend của hệ thống quản lý phim **MoviesWeb** được xây dựng trên **Next.js v15** với các công nghệ và thư viện hỗ trợ tối ưu cho trải nghiệm người dùng và khả năng quản lý dữ liệu. Tương thích giao diện trên các thiết bị từ điện thoại, tablet đến laptop, desktop. Hệ thống bao gồm các chức năng dành cho **người dùng** và **admin**, với khả năng CRUD dữ liệu phim, thể loại, quốc gia, phiên bản, và máy chủ, hỗ trợ tìm kiếm, phân trang và upload hàng loạt bằng CSV.

---

## Công nghệ chính

- **Framework:** [Next.js 15](https://nextjs.org/docs)
- **Xác thực:** [NextAuth.js](https://next-auth.js.org/)
- **CSS:** [TailwindCSS](https://tailwindcss.com/)
- **Carousel:** [Swiper](https://swiperjs.com/)
- **CSV parsing:** [PapaParse](https://www.papaparse.com/)
- **Data fetching & caching:** [React Query](https://tanstack.com/query/v4)
- **Mock server:** Express (JavaScript) phục vụ dữ liệu giả lập cho test UI

---

## Chức năng

### Dành cho người dùng

- Tìm kiếm phim theo:
  - Thể loại
  - Loại phim
  - Quốc gia
  - Tên phim
- Xem thông tin phim
- Xem phim dạng ( với định dạng **iframe nhúng streaming**)

### Dành cho admin

- CRUD:
  - Phim
  - Thể loại
  - Quốc gia
  - Phiên bản
  - Máy chủ
- Hỗ trợ upload hàng loạt phim bằng file CSV
  _Ảnh sử dụng là các link từ các nguồn được khai báo trong `next.config.js`_
  _Thông tin streaming phim là các đường dẫn nhúng từ các nguồn cho phép nhúng video_

---

## Cấu hình môi trường

File `.env` mẫu:

```env
# Mock server
# NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

# Your Backend API
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1

NEXTAUTH_SECRET=your secret key

```

## Cài đặt và chạy dự án

### 1. Cài đặt dependencies

```env
    npm install
    # hoặc
    yarn install
```

### 2. Chạy mock server (dữ liệu giả lập)

```env
    npm run dev:mock
```

_Mock server chạy trên cổng 4000, hỗ trợ test giao diện mà không cần backend thực._

### 3. Chạy frontend

```env
npm run dev
```

_Mở trình duyệt tại http://localhost:3000_

## Lưu ý

- Khi mock server chạy, các request API sẽ lấy dữ liệu giả lập, không ảnh hưởng đến backend thực.
- Các nguồn ảnh phải được khai báo trong `next.config.js` để Next.js load hợp lệ.
- Middleware `withAuth` bảo vệ các route cần xác thực (admin hoặc user).
- Nếu `API backend endpoints` có sự khác biệt với các endpoint được định nghĩa trong `libs/api.ts` và các `services` tương ứng, cần chỉnh sửa tại:
  - `libs/api.ts`
  - Các file trong `services` tương ứng
- Nếu dữ liệu từ API khác với các `type` đã định nghĩa, có thể viết **hàm mapper** để map dữ liệu về đúng type khi gọi api, đảm bảo frontend hoạt động chính xác.
- Đảm bảo các cổng 4000 và 3000 không bị chiếm dụng khi chạy hoặc điều chỉnh các cổng phù hợp

## Trần Huỳnh Chương
