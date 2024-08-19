export const cardList = (() => {
  const result: any[] = [];
  const titles = [
    'surging测试',
    'Tcp测试',
    'UDP测试',
    'RTMP测试',
    'HTTP测试',
    'DNS测试',
    'UDP测试1',
    'Tcp测试1',
    'UDP测试2',
    'Tcp测试2',
    'UDP测试3',
  ];
  const componentTypes = [
    'grpc_server',
    'Tcp_server',
    'udp_server',
    'rtmp_server',
    'http_server',
    'dns_server',
    'udp_server',
    'tcp_server',
    'udp_server',
    'tcp_server',
    'udp_server',
  ];
  result.push({});
  for (let i = 0; i < 12; i++) {
    result.push({
      id: i,
      title: titles[i],
      componenttype: componentTypes[i],
      icon: 'logos:vue',
      color: '#1890ff',
      active: '100',
      new: '1,799',
      download: 'bx:bx-download',
    });
  }
  return result;
})();
