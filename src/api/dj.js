import pangu from 'pangu';

import { cacheDjProgramDetail, getDjProgramDetailFromCache } from '@/utils/db';
import request from '@/utils/request';

/**
 * 获取电台简介
 * 说明 ： 调用此接口 ，传入电台 rid， 即可获得电台内容
 * @param {number} rid
 */
export function getDjDetail(rid) {
  return request({
    url: '/dj/detail',
    method: 'get',
    params: {
      rid,
    },
  }).then(data => {
    // Add space automatically
    data.data.name = pangu.spacing(data.data.name);
    data.data.rcmdText = pangu.spacing(data.data.rcmdText);
    data.data.desc = pangu.spacing(data.data.desc);

    return data;
  });
}

/**
 * 获取电台节目列表
 * 说明 : 调用此接口，可获取电台节目
 * - limit - 返回数量 , 默认为 30
 * - offset - 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * - asc - 排序方式,默认为 false (新 => 老 ) 设置 true 可改为 老 => 新
 * @param {number} rid
 * @param {Object} params
 * @param {number} params.limit
 * @param {number} params.offset
 * @param {number} params.asc
 */
export function getDjPrograms(rid, params) {
  return request({
    url: '/dj/program',
    method: 'get',
    params: {
      rid,
      ...params,
    },
  }).then(data => {
    // Add space automatically
    data.programs = data.programs.map(program => {
      program.name = pangu.spacing(program.name);
      program.mainSong.name = pangu.spacing(program.mainSong.name);
      return program;
    });

    return data;
  });
}

/**
 * 获取电台节目详情
 * 说明 : 调用此接口传入电台节目id,可获得电台节目详情
 * @param id
 */
export function getDjProgramDetail(id) {
  const fetchLatest = () => {
    return request({
      url: '/dj/program/detail',
      method: 'get',
      params: {
        id,
      },
    }).then(data => {
      // Add space automatically
      data.program.name = pangu.spacing(data.program.name);
      data.program.description = pangu.spacing(data.program.description);
      data.program.radio.name = pangu.spacing(data.program.radio.name);
      data.program.mainSong.name = pangu.spacing(data.program.mainSong.name);

      cacheDjProgramDetail(data);
      return data;
    });
  };
  return getDjProgramDetailFromCache(id).then(result => {
    return result ?? fetchLatest();
  });
}

/**
 * 订阅电台
 * 说明：调用此接口，传入电台 ID，可订阅电台
 * - rid：电台 ID
 * - t：操作，1 为订阅，0 为取消订阅
 * @param {Object} params
 * @param {number} params.rid
 * @param {number} params.t
 */
export function subscribeDj(params) {
  return request({
    url: '/dj/sub',
    method: 'post',
    params,
  });
}
