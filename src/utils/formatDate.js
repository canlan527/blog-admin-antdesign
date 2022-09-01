export default function(timestamp) {
  const date = new Date(+timestamp);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');
  const sec = date.getSeconds().toString().padStart(2, '0');

  // 星期几
  const weeklist = ['星期日','星期一','星期二','星期三','星期四','星期五', '星期六'];
  const week = weeklist[date.getDay()];

  return `${date.getFullYear()}-${month}-${day} ${hour}:${min}:${sec} ${week}`;
}
