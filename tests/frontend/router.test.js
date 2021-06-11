import { router } from '../../source/frontend/app/scripts/router';
test('setState works and defaults to Daily Log', () => {
    router.setState();
    expect(location.hash).toBe("#/dailyLog");
  });