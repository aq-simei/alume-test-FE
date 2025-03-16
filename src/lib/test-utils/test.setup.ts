import "@testing-library/jest-dom/vitest";

global.ResizeObserver = class ResizeObserver {
  observe() {
    // Do nothing
  }
  unobserve() {
    // Do nothing
  }
  disconnect() {
    // Do nothing
  }
};
