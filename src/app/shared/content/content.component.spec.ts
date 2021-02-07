import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { IGitHubRepo } from '../data-sorce/entities/github-repos.interface';

import { ContentModule } from './content.module';
import { ContentComponent } from './content.component';

describe('ContentComponent', () => {
    let spectator: Spectator<ContentComponent>;

    const mockData: IGitHubRepo[] = [{ id: 1, name: 'some name', stargazers_count: 1 }];

    const createComponent = createComponentFactory({
        component: ContentComponent,
        imports: [ContentModule],
        declareComponent: false, // Defaults to true
    });

    beforeEach(() => {
        spectator = createComponent();
    });

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
        expect(spectator.debugElement).toBeTruthy();
    });

    it('не отображаются данные.', () => {
        expect(spectator.query('[data-element="list"]')).toBeFalsy();
        expect(spectator.query('[data-element="empty-list"]')).toBeTruthy();
    });

    it('отображаются данные.', () => {
        spectator.setInput({ repos: mockData });

        expect(spectator.query('[data-element="empty-list"]')).toBeFalsy();
        expect(spectator.query('[data-element="list"]')).toBeTruthy();
    });
});
