import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SearchModule } from './search.module';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
    let spectator: Spectator<SearchComponent>;

    const createComponent = createComponentFactory({
        component: SearchComponent,
        imports: [SearchModule],
        declareComponent: false, // Defaults to true
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
        expect(spectator.debugElement).toBeTruthy();
    });

    it('отображается label.', () => {
        expect(spectator.query('[data-element="label"]')).toHaveText('Поиск');
    });

    describe('input element', () => {
        it('отображается input.', () => {
            expect(spectator.query('[data-element="input"]')).toBeTruthy();
        });

        it('отображается сообщение об ошибке при валидации', () => {
            spectator.typeInElement('q', '[data-element="input"]');

            expect(spectator.query('[data-element="error"]')).toHaveText('В строке поиска должно быть более 2-х символов');
        });

        it('не отображается сообщение об ошибке при длине строки поика более 2-х символов', () => {
            spectator.typeInElement('qwe', '[data-element="input"]');

            expect(spectator.query('[data-element="error"]')).toBeFalsy();
        });

        it('не отображается сообщение об ошибке при пустой строке поиска', () => {
            expect(spectator.query('[data-element="error"]')).toBeFalsy();
        });
    });
});
