package io.cem.modules.cem.controller;

import com.alibaba.fastjson.JSONObject;
import io.cem.common.exception.RRException;
import io.cem.common.utils.JSONUtils;
import io.cem.common.utils.PageUtils;
import io.cem.common.utils.R;
import io.cem.modules.cem.entity.ProbeGroupEntity;
import io.cem.modules.cem.service.ProbeGroupService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * @author Miao
 * @date 2017-10-12 17:12:46
 */
@RestController
@RequestMapping("/cem/probegroup")
public class ProbeGroupController {
	@Autowired
	private ProbeGroupService ProbeGroupService;

	/**
	 * 探针组列表
	 * @param groupdata
	 * @param page
	 * @param limit
	 * @return R
	 * @throws Exception
	 */
	@RequestMapping("/list")
	@RequiresPermissions("probegroup:list")
	public R list(String groupdata, Integer page, Integer limit) throws Exception {
		Map<String, Object> map = new HashMap<>();
		JSONObject groupdata_jsonobject = JSONObject.parseObject(groupdata);
		try {
			map.putAll(JSONUtils.jsonToMap(groupdata_jsonobject));
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
			total = ProbeGroupService.queryTotal(map);
		}
		List<ProbeGroupEntity> groupList = ProbeGroupService.queryList(map);
		PageUtils pageUtil = new PageUtils(groupList, total, limit, page);
		return R.ok().put("page", pageUtil);
	}

	/**
	 * 查询列表
	 * @param groupdata
	 * @param page
	 * @param limit
	 * @return R
	 * @throws Exception
	 */
	@RequestMapping("/searchlist")
	@RequiresPermissions("probegroup:list")
	public R searchlist(String groupdata, Integer page, Integer limit) throws Exception {
		Map<String, Object> map = new HashMap<>();
		JSONObject groupdata_jsonobject = JSONObject.parseObject(groupdata);
		try {
			map.putAll(JSONUtils.jsonToMap(groupdata_jsonobject));
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
			total = ProbeGroupService.queryTotal(map);
		}
		List<ProbeGroupEntity> probeGroupList = ProbeGroupService.queryList(map);
		PageUtils pageUtil = new PageUtils(probeGroupList, total, limit, page);
		return R.ok().put("page", pageUtil);
	}


	/**
	 * 根据ID筛选信息
	 * @param id
	 * @return R
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("probegroup:info")
	public R info(@PathVariable("id") Integer id){
		ProbeGroupEntity probeGroup = ProbeGroupService.queryObject(id);
		
		return R.ok().put("probeGroup", probeGroup);
	}

	/**
	 * 保存
	 * @param probeGroup
	 * @return R
	 */
	@RequestMapping("/save")
	@RequiresPermissions("probegroup:save")
	public R save(@RequestBody ProbeGroupEntity probeGroup){
		if (ProbeGroupService.queryExist(probeGroup.getName()) > 0) {
			return R.error(300, "探针组名称已存在，请重新输入");
		} else {
			ProbeGroupService.save(probeGroup);
			return R.ok();
		}
	}

	/**
	 * 修改
	 * @param probeGroup
	 * @return R
	 */
	@RequestMapping("/update")
	@RequiresPermissions("probegroup:update")
	public R update(@RequestBody ProbeGroupEntity probeGroup){
		if (ProbeGroupService.queryUpdate(probeGroup.getName(),probeGroup.getId()) > 0) {
			return R.error(300, "探针组名称已存在，请重新输入");
		} else {
			ProbeGroupService.update(probeGroup);
			return R.ok();
		}
	}

	/**
	 * 删除
	 * @param ids
	 * @return R
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("probegroup:delete")
	public R delete(@RequestBody Integer[] ids){
		ProbeGroupService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
