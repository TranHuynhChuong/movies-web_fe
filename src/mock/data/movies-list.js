/**
 * Mock dữ liệu danh sách phim
 * @file mock/movies-list.ts
 */

export const moviesList = {
  data: {
    page: 1,
    totalPages: 5,
    totalResults: 35,
    results: [
      ...Array.from({ length: 8 }, (_, index) => ({
        id: ('ABC' + index).toString(),
        title: `Đi Đêm Lắm Có Ngày Gặp Mèo`,
        originalTitle: `Nyaight Of The Living Cat`,
        posterPath:
          'https://phim.nguonc.com/public/images/Post/2/di-dem-lam-co-ngay-gap-meo-fpt-play-1751612178939_Portrait_origin.jpg',
        backdropPath:
          'https://phim.nguonc.com/public/images/Post/2/di-dem-lam-co-ngay-gap-meo-fpt-play-1751612178942_Landscape.jpg',
        mediaType: 'series',
        status: 'show',
        versions: [
          {
            id: 'phu-de',
            name: 'Phụ Đề',
            currentEp: 9,
          },
        ],
        runtime: 23,
        numberOfEpisodes: 12,
        releaseYear: 2025,
        genres: [
          { id: 'abcdef1', name: 'Anime' },
          { id: 'abcdef2', name: 'Phim Hài' },
          { id: 'abcdef3', name: 'Giả Tưởng' },
        ],
        overview:
          'Khi một loại virus kỳ quái biến con người thành... mèo lông lá chỉ bằng những cái ôm, thế giới nhanh chóng rơi vào hỗn loạn. Kunagi - người đàn ông mất trí nhớ nhưng hiểu mèo đến lạ thường, phải đấu tranh sinh tồn trong khi cố cưỡng lại sức hấp dẫn khó tả của những chú mèo đáng yêu chết người. Ẩn mình giữa đống đổ nát, anh cùng những người sống sót chống lại đại dịch ôm là hóa mèo. Hài hước, kịch tính và không kém phần quái đản, đây là cuộc chiến sinh tồn kỳ lạ nhất bạn từng thấy!',
        createdAt: '2015-05-15T16:31:23.000Z',
        updatedAt: '2015-05-19T16:31:23.000Z',
      })),
      ...Array.from({ length: 8 }, (_, index) => ({
        id: (123 + index).toString(),
        title: `Đi Đêm Lắm Có Ngày Gặp Mèo`,
        originalTitle: `Nyaight Of The Living Cat`,
        posterPath:
          'https://phim.nguonc.com/public/images/Post/2/di-dem-lam-co-ngay-gap-meo-fpt-play-1751612178939_Portrait_origin.jpg',
        backdropPath:
          'https://phim.nguonc.com/public/images/Post/2/di-dem-lam-co-ngay-gap-meo-fpt-play-1751612178942_Landscape.jpg',
        mediaType: 'movies',
        status: 'show',
        versions: [
          {
            id: 'phu-de',
            name: 'Phụ Đề',
            currentEp: 9,
          },
        ],
        runtime: 23,
        numberOfEpisodes: 1,
        releaseYear: 2025,
        genres: [
          { id: 'abcdef1', name: 'Anime' },
          { id: 'abcdef2', name: 'Phim Hài' },
          { id: 'abcdef3', name: 'Giả Tưởng' },
        ],
        overview:
          'Khi một loại virus kỳ quái biến con người thành... mèo lông lá chỉ bằng những cái ôm, thế giới nhanh chóng rơi vào hỗn loạn. Kunagi - người đàn ông mất trí nhớ nhưng hiểu mèo đến lạ thường, phải đấu tranh sinh tồn trong khi cố cưỡng lại sức hấp dẫn khó tả của những chú mèo đáng yêu chết người. Ẩn mình giữa đống đổ nát, anh cùng những người sống sót chống lại đại dịch ôm là hóa mèo. Hài hước, kịch tính và không kém phần quái đản, đây là cuộc chiến sinh tồn kỳ lạ nhất bạn từng thấy!',
        createdAt: '2015-05-15T16:31:23.000Z',
        updatedAt: '2015-05-19T16:31:23.000Z',
      })),
      ...Array.from({ length: 8 }, (_, index) => ({
        id: (1234 + index).toString(),
        title: `Đi Đêm Lắm Có Ngày Gặp Mèo ${index + 1}`,
        originalTitle: `Nyaight Of The Living Cat ${index + 1}`,
        posterPath:
          'https://phim.nguonc.com/public/images/Post/2/di-dem-lam-co-ngay-gap-meo-fpt-play-1751612178939_Portrait_origin.jpg',
        backdropPath:
          'https://phim.nguonc.com/public/images/Post/2/di-dem-lam-co-ngay-gap-meo-fpt-play-1751612178942_Landscape.jpg',
        mediaType: 'movies',
        status: 'hidden',
        versions: [],
        runtime: 23,
        numberOfEpisodes: 1,
        releaseYear: 2025,
        genres: [
          { id: 'abcdef1', name: 'Anime' },
          { id: 'abcdef2', name: 'Phim Hài' },
          { id: 'abcdef3', name: 'Giả Tưởng' },
        ],
        overview:
          'Khi một loại virus kỳ quái biến con người thành... mèo lông lá chỉ bằng những cái ôm, thế giới nhanh chóng rơi vào hỗn loạn. Kunagi - người đàn ông mất trí nhớ nhưng hiểu mèo đến lạ thường, phải đấu tranh sinh tồn trong khi cố cưỡng lại sức hấp dẫn khó tả của những chú mèo đáng yêu chết người. Ẩn mình giữa đống đổ nát, anh cùng những người sống sót chống lại đại dịch ôm là hóa mèo. Hài hước, kịch tính và không kém phần quái đản, đây là cuộc chiến sinh tồn kỳ lạ nhất bạn từng thấy!',
        createdAt: '2015-05-15T16:31:23.000Z',
        updatedAt: '2015-05-19T16:31:23.000Z',
      })),
    ],
  },
};
