import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { TitleModule } from './title.module';
import { TitleComponent } from './title.component';

describe('TitleComponent', () => {
    let spectator: Spectator<TitleComponent>;

    const createComponent = createComponentFactory({
        component: TitleComponent,
        imports: [TitleModule],
        declareComponent: false, // Defaults to true
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
        expect(spectator.debugElement).toBeTruthy();
    });

    it('отображается заголовок.', () => {
        expect(spectator.query('h1')).toHaveText('GitHub search Repositories.');
    });
});
