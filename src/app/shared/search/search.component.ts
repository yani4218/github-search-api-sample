import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
    @Output() search = new EventEmitter<string>();

    errorMessage = '';
    searchForm = new FormGroup({
        searchText: new FormControl('', Validators.minLength(3))
    });

    get searchFormControls(): { [key: string]: AbstractControl; } {
        return this.searchForm && this.searchForm.controls;
    }

    get hasError(): boolean {
        return this.searchFormControls.searchText.invalid;
    }

    ngOnInit(): void {
        this.initSearchControlListener();
    }

    private initSearchControlListener(): void {
        this.searchFormControls.searchText.valueChanges
            .pipe(
                filter((search: string) => search?.length > 2 || !search),
                distinctUntilChanged(),
                debounceTime(500),
                untilDestroyed(this))
            .subscribe(search => this.search.emit(search));
    }
}
