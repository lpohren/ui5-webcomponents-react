import contentLoaderSerializer from '@shared/tests/serializer/content-loader-serializer.cjs';
import '@testing-library/jest-dom';
import 'intersection-observer';
import ResizeObserver from 'resize-observer-polyfill';

const setupMatchMedia = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  });
};

beforeAll(async () => {
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: any) => cb());

  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1366 });
  Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 768 });

  (window as any).ResizeObserver = ResizeObserver;
  window.scrollTo = jest.fn();
  setupMatchMedia();

  await import('@ui5/webcomponents/dist/Assets');
  await import('@ui5/webcomponents-fiori/dist/Assets');
  await import('@ui5/webcomponents-icons/dist/Assets');
  await import('@ui5/webcomponents-react/dist/Assets');
});

expect.addSnapshotSerializer(contentLoaderSerializer);
