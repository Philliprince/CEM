package io.cem.modules.cem.service;

import io.cem.modules.cem.entity.RecordHourPingEntity;
import io.cem.modules.cem.entity.RecordHourTracertEntity;
import io.cem.modules.cem.entity.ScoreEntity;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author ${author}
 * @email ${email}
 * @date 2017-12-02 14:35:31
 */
public interface RecordHourPingService {
	
	RecordHourPingEntity queryObject(Integer id);

	Map queryTime();

	Map queryDay();
	
	List<RecordHourPingEntity> queryList(Map<String, Object> map);

	List<RecordHourPingEntity> queryPing(Map<String, Object> map);

	List<RecordHourPingEntity> queryPingList(Map<String, Object> map);

	List<RecordHourPingEntity> queryDayList(Map<String, Object> map);

	List<ScoreEntity> calculatePingIcmp(List<RecordHourPingEntity> pingList);

	List<ScoreEntity> calculatePingTcp(List<RecordHourPingEntity> pingList);

	List<ScoreEntity> calculatePingUdp(List<RecordHourPingEntity> pingList);

	List<ScoreEntity> calculateTracertIcmp(List<RecordHourTracertEntity> tracertList);

	List<ScoreEntity> calculateTracertUdp(List<RecordHourTracertEntity> tracertList);

	List<ScoreEntity> calculateService1(List<ScoreEntity> pingIcmp,List<ScoreEntity> pingTcp,List<ScoreEntity> pingUdp,List<ScoreEntity> tracertIcmp,List<ScoreEntity> tracertUdp);

	List<ScoreEntity> calculateDate1(List<ScoreEntity> pingIcmp,List<ScoreEntity> pingTcp,List<ScoreEntity> pingUdp,List<ScoreEntity> tracertIcmp,List<ScoreEntity> tracertUdp);

	List<ScoreEntity> calculateArea1(List<ScoreEntity> pingIcmp,List<ScoreEntity> pingTcp,List<ScoreEntity> pingUdp,List<ScoreEntity> tracertIcmp,List<ScoreEntity> tracertUdp);

	int differentDays(Date date1, Date date2);

	int queryTotal(Map<String, Object> map);
	
	void save(RecordHourPingEntity recordHourPing);
	
	void update(RecordHourPingEntity recordHourPing);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}
