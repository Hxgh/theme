type ThemeChangeCallback = (isDarkMode: boolean) => void;

export default class ThemeChangeObserver {
  private mediaQuery: MediaQueryList;
  private callbacks: Set<ThemeChangeCallback>;
  private boundChangeHandler: (e: MediaQueryListEvent) => void;

  constructor() {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.callbacks = new Set();
    this.boundChangeHandler = this.handleThemeChange.bind(this);
    this.attachEventListener();
  }

  // 订阅主题变化事件
  public subscribe(callback: ThemeChangeCallback): () => void {
    if (typeof callback !== 'function') {
      throw new Error('回调函数必须是一个函数');
    }

    this.callbacks.add(callback);
    // 立即执行一次回调，获取当前主题状态
    callback(this.mediaQuery.matches);
    return () => this.unsubscribe(callback);
  }

  // 取消订阅
  public unsubscribe(callback: ThemeChangeCallback): void {
    this.callbacks.delete(callback);
  }

  // 获取当前是否为深色模式
  public isDarkMode(): boolean {
    return this.mediaQuery.matches;
  }

  // 清理资源
  public dispose(): void {
    this.detachEventListener();
    this.callbacks.clear();
  }

  private attachEventListener(): void {
    this.mediaQuery.addEventListener('change', this.boundChangeHandler);
  }

  private detachEventListener(): void {
    this.mediaQuery.removeEventListener('change', this.boundChangeHandler);
  }

  private handleThemeChange(event: MediaQueryListEvent): void {
    const isDarkMode = event.matches;

    // 克隆回调集合防止迭代过程中被修改
    const currentCallbacks = Array.from(this.callbacks);
    for (const callback of currentCallbacks) {
      try {
        callback(isDarkMode);
      } catch (error) {
        console.error('主题变化回调执行错误:', error);
      }
    }
  }
}

export const themeObserver = new ThemeChangeObserver();
