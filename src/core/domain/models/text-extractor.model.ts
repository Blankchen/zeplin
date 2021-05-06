// reference: https://github.com/kubiqsk/text-extractor/blob/master/src/index.js

import { LayersEntity, ScreenDetail } from 'src/core/domain/interfaces/screen-detail';
class TextData {
  divider = '\n\n';
  textsObj = [] as LayersEntity[];
}

interface ScreenOutput {
  text: string;
}

const sortXFn = (a: LayersEntity, b: LayersEntity) => a.rect.x - b.rect.x;
const sortYFn = (a: LayersEntity, b: LayersEntity) => a.rect.y - b.rect.y;

export class TextExtractorModel {
  constructor() { }

  static screen(selectedVersion: ScreenDetail): ScreenOutput {
    const layers = selectedVersion.layers || [];
    const textData = new TextData();
    this.findInnerTexts(textData, layers);
    const text = textData.textsObj.map(x => x.content).join(textData.divider);
    return {
      text,
    };
  }

  private static findInnerTexts(textData: TextData, layers: LayersEntity[]): void {
    // sort layer from left to right and top to down
    let sortedLayer = layers.sort(sortXFn);
    sortedLayer = sortedLayer.sort(sortYFn);
    sortedLayer.forEach((subLayer: LayersEntity): void => {
      if (subLayer.type === 'text') {
        textData.textsObj.push(subLayer);
      } else if (subLayer.layers && !!subLayer.layers.length) {
        this.findInnerTexts(textData, subLayer.layers);
      }
    });
  }

}
