/**
 * Mock dữ liệu danh sách phim
 * @file mock/movies-list.ts
 */

export const moviesList = {
  data: {
    page: 1,
    total_pages: 5,
    total_results: 35,
    results: Array.from({ length: 32 }, (_, index) => ({
      id: (12345678 + index).toString(),
      title: `Đi Đêm Lắm Có Ngày Gặp Mèo ${index + 1}`,
      original_title: `Nyaight Of The Living Cat ${index + 1}`,
      poster_path:
        'https://phim.nguonc.com/public/images/Post/2/di-dem-lam-co-ngay-gap-meo-fpt-play-1751612178939_Portrait_origin.jpg',
      backdrop_path:
        'https://phim.nguonc.com/public/images/Post/2/di-dem-lam-co-ngay-gap-meo-fpt-play-1751612178942_Landscape.jpg',
      media_type: 'series',
      status: 'show',
      versions: [
        { id: 1, name: 'Phụ đề', current_ep: 9 },
        { id: 2, name: 'Thuyết Minh', current_ep: 8 },
        { id: 3, name: 'Lồng Tiếng', current_ep: 10 },
      ],
      runtime: 23,
      number_of_episodes: 12,
      release_year: 2025,
      genres: [
        { id: 'abcdef1', name: 'Anime' },
        { id: 'abcdef2', name: 'Phim Hài' },
        { id: 'abcdef3', name: 'Giả Tưởng' },
      ],
      overview:
        'Khi một loại virus kỳ quái biến con người thành... mèo lông lá chỉ bằng những cái ôm, thế giới nhanh chóng rơi vào hỗn loạn. Kunagi - người đàn ông mất trí nhớ nhưng hiểu mèo đến lạ thường, phải đấu tranh sinh tồn trong khi cố cưỡng lại sức hấp dẫn khó tả của những chú mèo đáng yêu chết người. Ẩn mình giữa đống đổ nát, anh cùng những người sống sót chống lại đại dịch ôm là hóa mèo. Hài hước, kịch tính và không kém phần quái đản, đây là cuộc chiến sinh tồn kỳ lạ nhất bạn từng thấy!',
      create_at: '2015-05-15T16:31:23.000Z',
      update_at: '2015-05-19T16:31:23.000Z',
    })),
  },
};
