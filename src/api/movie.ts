import { get } from '../service/interceptor'

export const getMovieList = (params: {apikey: string}) => { // 获取豆瓣近期影视列表
  return get('/v2/movie/new_movies', { params }, 0, true)
}
// https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=100&page_start=0

