package io.cem.modules.cem.dao;

import io.cem.modules.cem.entity.CountyEntity;
import io.cem.modules.sys.dao.BaseDao;

import java.util.List;

/**
 * 行政区域县区信息表
 * 
 * @author ${author}
 * @email ${email}
 * @date 2017-11-05 20:56:26
 */
public interface CountyDao extends BaseDao<CountyEntity> {
    List<CountyEntity> queryCountyList(Integer id);
    List<CountyEntity> queryByProbe(Integer id);
}
