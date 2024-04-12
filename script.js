import http from 'k6/http';
import { check, fail } from 'k6';

export default function () {
  const res = http.get('https://httpbin.test.k6.io');
  const checkOutput = check(
    res,
    {
      'response code was 200': (res) => res.status == 200,
      'body size > 0 bytes': (res) => res.body.length != 0,
    },
    { tag: "Test1" }
  );

  if (!checkOutput) {
    fail('unexpected response');
  }
}
