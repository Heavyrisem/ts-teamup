import { AxiosInstance } from 'axios';

import {
  CreateFeedBody,
  CreateFeedResponse,
  CreateReplyBody,
  CreateReplyResponse,
  GetFeedsQuery,
  GetFeedsResponse,
  GetRepliesResponse,
  Reply,
} from '~types/feed.interface';
import { HOST } from '~utils/constants';
import { genURL } from '~utils/url';

export class EventAPI {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  /**
   * 피드 마크업
   * @param feed 피드 번호
   */
  async getMarkup(feed: number) {
    return this.axiosInstance
      .get<string>(`${HOST.EDGE}/feed/markup/${feed}`)
      .then((res) => res.data);
  }

  /**
   * 피드 목록
   * @param count 가져올 피드 수
   * Size range: 1-100
   * @param way 방향 (0:최신, 1:이전, 2:이후)
   * Default value: 0
   * Size range: 0-2
   * @param start 피드 번호 시작
   */
  async getFeeds(count: number, way?: number, start?: number, query?: GetFeedsQuery) {
    return this.axiosInstance
      .get<GetFeedsResponse>(genURL(`${HOST.EDGE}/feeds/${count}`, way, start), {
        params: query,
      })
      .then((res) => res.data);
  }

  /**
   * 피드 정보
   * @param feed 피드 번호
   */
  async getFeed(feed: number) {
    return this.axiosInstance.get(`${HOST.EDGE}/feed/${feed}`).then((res) => res.data);
  }

  /**
   * 피드 삭제
   * @param feed 피드 번호
   */
  async deleteFeed(feed: number) {
    return this.axiosInstance.delete(`${HOST.EDGE}/feed/${feed}`).then((res) => res.status === 204);
  }

  /**
   * 피드 생성
   * @param feedGroup 피드 그룹 번호
   * @param data 생성할 피드 정보
   */
  async createFeed(feedGroup: number, data: CreateFeedBody) {
    const { type, ...feedData } = data;
    return this.axiosInstance
      .post<CreateFeedResponse>(genURL(`${HOST.EDGE}/feed/${feedGroup}`, type), feedData)
      .then((res) => res.data);
  }

  /**
   * 피드 좋아요 생성
   * @param feed 피드 번호
   */
  async likeFeed(feed: number) {
    return this.axiosInstance
      .post(`${HOST.EDGE}/feed/like/${feed}`)
      .then((res) => res.status === 201);
  }

  /**
   * 댓글 목록
   * @param feed 피드 번호
   * @param count 가져올 댓글 수
   * Size range: 1-100
   * @param way 방향 (0:최신, 1:이전, 2:이후)
   * Default value: 0
   * Size range: 0-2
   * @param start 댓글 번호 시작
   * @param parent 상위 댓글 번호 시작 (지정 시 계층 정렬)
   */
  async getReplies(feed: number, count: number, way?: number, start?: number, parent?: number) {
    return this.axiosInstance
      .get<GetRepliesResponse>(genURL(`${HOST.EDGE}/feed/replies/${feed}/${count}`, way, start), {
        params: { parent },
      })
      .then((res) => res.data);
  }

  /**
   * 댓글 정보
   * @param reply 댓글 번호
   * @param all 전체 내용 여부(0:요약, 1:전체)
   * Default value: 0
   * Size range: 0-1
   */
  async getReply(reply: number, all: number) {
    return this.axiosInstance
      .get<Reply>(`${HOST.EDGE}/feed/reply/${reply}`, { params: { all } })
      .then((res) => res.data);
  }

  /**
   * 댓글 삭제
   * @param reply 댓글 번호
   */
  async deleteReply(reply: number) {
    return this.axiosInstance
      .delete(`${HOST.EDGE}/feed/reply/${reply}`)
      .then((res) => res.status === 204);
  }

  /**
   * 댓글 생성
   * @param feed 피드 번호
   * @param data 생성할 댓글 정보
   */
  async createReply(feed: number, data: CreateReplyBody) {
    const { parent, ...replyData } = data;
    return this.axiosInstance
      .post<CreateReplyResponse>(`${HOST.EDGE}/feed/reply/${feed}`, replyData, {
        params: { parent },
      })
      .then((res) => res.data);
  }
}
