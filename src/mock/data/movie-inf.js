export const movieInf = {
  data: {
    id: '12345678',
    title: 'Đi Đêm Lắm Có Ngày Gặp Mèo',
    originalTitle: 'Nyaight Of The Living Cat',
    posterPath:
      'https://phim.nguonc.com/public/images/Post/2/di-dem-lam-co-ngay-gap-meo-fpt-play-1751612178939_Portrait_origin.jpg',
    // backdropPath:
    //   'https://phim.nguonc.com/public/images/Post/2/di-dem-lam-co-ngay-gap-meo-fpt-play-1751612178942_Landscape.jpg',
    mediaType: 'series',
    status: 'show',
    runtime: 23,
    numberOfEpisodes: 12,
    releaseYear: 2025,
    // trailerPath: 'https://youtu.be/43RsKvVAjWM?si=PtZh8xS2xEcE9pNN',
    genres: [
      { id: 'abcdef1', name: 'Anime' },
      { id: 'abcdef2', name: 'Phim Hài' },
      { id: 'abcdef3', name: 'Giả Tưởng' },
    ],
    overview:
      'Khi một loại virus kỳ quái biến con người thành... mèo lông lá chỉ bằng những cái ôm, thế giới nhanh chóng rơi vào hỗn loạn. Kunagi - người đàn ông mất trí nhớ nhưng hiểu mèo đến lạ thường, phải đấu tranh sinh tồn trong khi cố cưỡng lại sức hấp dẫn khó tả của những chú mèo đáng yêu chết người...',
    actors:
      'Yoshiki Nakajima, Hiroki Yasumoto, Ryouta Takeuchi, Subaru Kimura, Yuu Serizawa, Reina Ueda',
    directors: 'Tomohiro Kamitani',
    country: {
      id: 'JP',
      name: 'Nhật Bản',
    },
    versions: [
      {
        id: 'phu-de',
        name: 'Phụ Đề',
        currentEp: 9,
        episodes: Array.from({ length: 9 }, (_, i) => ({
          episodeNumber: i + 1,
          streamingSources: [
            {
              orderIndex: 1,
              serverId: 'phim-nguonc',
              url: 'https://embed11.streamc.xyz/embed.php?hash=68408eab03cd03e2cb076b791c280682',
            },
          ],
        })),
      },
    ],
    createdAt: '2015-05-19T16:31:23.000Z',
    updatedAt: '2015-05-19T16:31:23.000Z',
  },
};
