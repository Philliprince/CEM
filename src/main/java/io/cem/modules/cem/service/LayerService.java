package io.cem.modules.cem.service;

import io.cem.modules.cem.entity.LayerEntity;

import java.util.List;
import java.util.Map;

/**
 */
public interface LayerService {
	
	LayerEntity queryObject(Integer id);
	
	List<LayerEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);

	int queryExist(String layerName);

	LayerEntity queryLowLayer(Integer layerTag);
	
	void save(LayerEntity layer);
	
	void update(LayerEntity layer);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}
