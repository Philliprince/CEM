package io.cem.modules.cem.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 
 * 
 * @author ${author}
 * @email ${email}
 * @date 2017-11-05 21:13:27
 */
public class SchedulePolicyEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//调度策略ID
	private Integer id;
	//名称
	private String spName;
	//Cron表达式
	private String scheduler;
	//备注
	private String remark;
	//创建时间
	private Date startDate;
	//
	private Date endDate;

	/**
	 * 设置：调度策略ID
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * 获取：调度策略ID
	 */
	public Integer getId() {
		return id;
	}
	/**
	 * 设置：名称
	 */
	public void setSpName(String spName) {
		this.spName = spName;
	}
	/**
	 * 获取：名称
	 */
	public String getSpName() {
		return spName;
	}
	/**
	 * 设置：Cron表达式
	 */
	public void setScheduler(String scheduler) {
		this.scheduler = scheduler;
	}
	/**
	 * 获取：Cron表达式
	 */
	public String getScheduler() {
		return scheduler;
	}
	/**
	 * 设置：备注
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}
	/**
	 * 获取：备注
	 */
	public String getRemark() {
		return remark;
	}
	/**
	 * 设置：创建时间
	 */
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	/**
	 * 获取：创建时间
	 */
	public Date getStartDate() {
		return startDate;
	}
	/**
	 * 设置：
	 */
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	/**
	 * 获取：
	 */
	public Date getEndDate() {
		return endDate;
	}
}
