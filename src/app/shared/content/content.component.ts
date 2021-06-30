import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IGitHubRepo } from '../github-data/entities/github-data.interface';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
    @Input() repos: IGitHubRepo[] = [];

    displayedColumns = ['name', 'stargazers_count'];
}
