import enhancedResizableTable from './resizable-table';

export default enhancedResizableTable;

/* 客户跟进列表使用说明
* @cisen 2017/4/13
* @param followList
*   数组，客户跟进列表
* @param attachments
*   数组，当前跟进输入上传的附件列表
* @param dispatch
* @param currentPage
*   数字，当前已加载的跟进的最新页码
* @param pageSize
* @param customerId
*   数字，客户ID
* @param startTime
*   字符串，获取的跟进的开始时间，例子：2017-04-01 00:00:00
* @param endTime
*   字符串，获取的跟进的结束时间，例子：2017-04-01 00:00:00
* 使用例子：
    <Follow followList={customer_followup.followUpList}
       dispatch={dispatch}
       attachments={customer_followup.attachments}
       currentPage={customer_followup.currentPage}
       pageSize={customer_followup.pageSize}
       customerId={customerId}
       startTime={startTime}
       endTime={endTime}
     />
*/
