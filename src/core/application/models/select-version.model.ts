import { ScreenVersionSummary } from 'src/core/domain/interfaces/screen-version';

export class SelectVersion {
  selectedScreen: ScreenVersionSummary[] = [];

  constructor() { }

  selectScreen(screen: ScreenVersionSummary): void {
    const idExist = this.selectedScreen.find(x => x.id === screen.id);
    if (idExist) {
      this.selectedScreen = this.selectedScreen.filter(x => x.id !== screen.id);
      return;
    }
    const isOverFlow = this.selectedScreen.length >= 2;
    if (!isOverFlow) {
      this.selectedScreen.push(screen);
    }
  }

  isScreenActive(screen: ScreenVersionSummary): boolean {
    return this.selectedScreen.some(x => x.id === screen.id);
  }

  getOrder(screen: ScreenVersionSummary): number {
    const index = this.selectedScreen.findIndex(x => x.id === screen.id);
    return index !== -1 ? index + 1 : 0;
  }

  get isButtonDisable(): boolean {
    return this.selectedScreen.length < 2;
  }

}
