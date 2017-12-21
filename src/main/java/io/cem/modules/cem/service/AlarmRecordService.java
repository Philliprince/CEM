package io.cem.modules.cem.service;

import io.cem.modules.cem.entity.AlarmRecordEntity;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017-10-12 17:12:44
 */
public interface AlarmRecordService {
	
	AlarmRecordEntity queryObject(Integer id);
	
	List<AlarmRecordEntity> queryList(Map<String, Object> map);

	List<AlarmRecordEntity> queryAlarmRecordList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(AlarmRecordEntity alarmRecord);
	
	void update(AlarmRecordEntity alarmRecord);

	void operate(Integer id);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}
