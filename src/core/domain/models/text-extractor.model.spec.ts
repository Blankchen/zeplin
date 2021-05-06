import { TextExtractorModel } from './text-extractor.model';
import data from '../data/screen-version.json';
import { ScreenDetail } from 'src/core/domain/interfaces/screen-detail';

describe('TextExtractorModel', () => {
  const screenDetail: ScreenDetail = data as any;

  beforeEach(() => {
  });

  it('screen should work', () => {
    const result = TextExtractorModel.screen(screenDetail);
    const expected = `OZ's book is well received and evolved
Lucky Roulette is crazy, and the Gemstone Gold Award is not over!
Following the successful launch of Zombie Blackjack last July, creative content studio Bunfox Games adds yet another blackjack variant to its portfolio of entertaining and innovative games. The release of Lucky Cat Blackjack marks the second collaboration between the inventive studio and renowned game creator Geoff Hall and hones the content supplier's strength in bringing creative titles to the modern gambler.
Featuring iconic Japanese Lucky Cat, Maneki-neko, and packed with lucky charms, Lucky Cat Blackjack's uniquely rewarding bonus feature, the Lucky Cat Dice Bonus, is triggered when the dealer hits 22. Four dice are rolled with the chance of rewarding up to 100x when the lucky cat paw symbol appears on all the dice, allowing players to experience the thrills of hitting big payouts in a classic blackjack setting.
\"We're all very excited to introduce Lucky Cat Blackjack to our players. As a Blackjack player myself, I knew I wanted to make this game as soon as Geoff showed the concept to me. Lucky Cat Blackjack preserves what I love most about Blackjack in the base gameplay but adds a thrilling Lucky Cat Dice bonus feature and a rich game theme that is tightly woven into the spirit of this game. We spent a great deal of time designing the art, visual effects and player interactions to bring the theme to life and give our players an exceptional gaming experience like no other Blackjack they've ever played. We can't wait for you to play this game!\" said Michael Lee, Chief Innovation Officer at Genesis/Bunfox.
Event time:
2019/10/14 - 2019/12/25
10/14 ~ 12/25
Back
News
Games
Promotions
Contact
All Rights Reserved. Please note that this website is designed solely for demostration purpose. No real money bets can take place on this site
Go Top`;
    // expect(result.text).toBe(expected);
  });
});

