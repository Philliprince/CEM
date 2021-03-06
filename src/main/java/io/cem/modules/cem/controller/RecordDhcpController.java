package io.cem.modules.cem.controller;

import com.alibaba.fastjson.JSONObject;
import io.cem.common.exception.RRException;
import io.cem.common.utils.JSONUtils;
import io.cem.common.utils.PageUtils;
import io.cem.common.utils.R;
import io.cem.modules.cem.entity.DiagnoseEntity;
import io.cem.modules.cem.entity.RecordDhcpEntity;
import io.cem.modules.cem.entity.RecordHourDhcpEntity;
import io.cem.modules.cem.service.RecordDhcpService;
import io.cem.modules.cem.service.TaskDispatchService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.lang.Thread.sleep;


/**
 */
@RestController
@RequestMapping("recorddhcp")
public class RecordDhcpController {
	@Autowired
	private RecordDhcpService recordDhcpService;

	@Autowired
	private TaskDispatchService taskDispatchService;

	/**
	 * 结果列表
	 * @param resultdata
	 * @param page
	 * @param limit
	 * @return R
	 * @throws Exception
	 */
	@RequestMapping("/list")
	public R list(String resultdata, Integer page, Integer limit) throws Exception {
		Map<String, Object> map = new HashMap<>();
		JSONObject resultdata_jsonobject = JSONObject.parseObject(resultdata);
		try {
			map.putAll(JSONUtils.jsonToMap(resultdata_jsonobject));
		} catch (RuntimeException e) {
			throw new RRException("内部参数错误，请重试！");
		}
		int total = 0;
		if(page==null) {              /*没有传入page,则取全部值*/
			map.put("offset", null);
			map.put("limit", null);
			page = 0;
			limit = 0;
		}else {
			map.put("offset", (page - 1) * limit);
			map.put("limit", limit);
		}
		if (Integer.parseInt(map.get("queryType").toString()) == 1) {
			List<RecordDhcpEntity> resultList = recordDhcpService.queryDhcpList(map);
			System.out.println(resultList);
			total = recordDhcpService.queryTotal(map);
			PageUtils pageUtil = new PageUtils(resultList, total, limit, page);
			return R.ok().put("page", pageUtil);
		} else {
			List<RecordHourDhcpEntity> resultList = recordDhcpService.queryIntervalList(map);
			System.out.println(resultList);
			total = recordDhcpService.queryIntervalTotal(map);
			PageUtils pageUtil = new PageUtils(resultList, total, limit, page);
			return R.ok().put("page", pageUtil);
		}
	}


	/**
	 * 根据id查询结果
	 * @param id
	 * @return
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("recorddhcp:info")
	public R info(@PathVariable("id") Integer id){
		RecordDhcpEntity recordDhcp = recordDhcpService.queryObject(id);
		
		return R.ok().put("recordDhcp", recordDhcp);
	}

	/**
	 * 实时诊断
	 * @param diagnoseEntity
	 * @return R
	 * @throws Exception
	 */
	@RequestMapping("/diagnose")
	public R diagnose(@RequestBody DiagnoseEntity diagnoseEntity) throws Exception{
		Map<String, Object> map = new HashMap<>();
		Integer[] dispatchId = diagnoseEntity.getDispatchId();
		int page = diagnoseEntity.getPage();
		int limit = diagnoseEntity.getLimit();
		map.put("offset", (page - 1) * limit);
		map.put("limit", limit);
		int total = dispatchId.length;
		for (int i = 0; i < 20; i++){
			if (taskDispatchService.queryTestStatus(dispatchId) > 0) {
				break;
			} else {
				sleep(2000);
			}
		}
		List<RecordDhcpEntity> resultList = new ArrayList<>();
		for(int i = 0; i<dispatchId.length;i++){
			map.put("dispatch_id", dispatchId[i]);
			resultList.addAll(recordDhcpService.queryDhcpTest(map));
		}
		System.out.println(resultList);
		PageUtils pageUtil = new PageUtils(resultList, total, limit, page);
		return R.ok().put("page", pageUtil);
	}

}
