import { GetUserFromEmailPipe } from './get-user-from-email.pipe';

describe('GetUserFromEmailPipe', () => {
  it('create an instance', () => {
    const pipe = new GetUserFromEmailPipe();
    expect(pipe).toBeTruthy();
  });
});
