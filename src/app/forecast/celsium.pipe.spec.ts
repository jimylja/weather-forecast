import { CelsiumPipe } from './celsium.pipe';

describe('TemperaturePipe', () => {
  it('create an instance', () => {
    const pipe = new CelsiumPipe();
    expect(pipe).toBeTruthy();
  });
});
