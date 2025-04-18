import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../../core/services/api.service';
import { GlobalSearchResult } from '../../../core/models/helperModals';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { filter } from 'rxjs/internal/operators/filter';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';



@Component({
  selector: 'app-global-search',
  standalone: true,
  imports: [
    MatFormFieldModule, MatIconModule, MatAutocompleteModule, FormsModule, MatInputModule
  ],
  templateUrl: './global-search.component.html',
  styleUrl: './global-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalSearchComponent {
  searchText$ = new BehaviorSubject<string>('');
  searchOptions = signal<GlobalSearchResult[]>([]);
  apiService = inject(ApiService);
  private searchSub?: Subscription;
  private router = inject(Router);

  constructor() {
    this.searchSub = this.searchText$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((text) => text.length > 0)
      )
      .subscribe((text) => {
        this.apiService.getGlobalSearchResults(text).subscribe({
          next: (response: GlobalSearchResult[]) => {
            this.searchOptions.set(response);
          },
          error: (error) => {
            console.error('Error fetching search options:', error);
          }
        });
      });
  }

  onSearchInput(text: string) {
    this.searchText$.next(text);
  }

  clearSearch() {
    this.searchText$.next('');
    this.searchOptions.set([]);
  }

  onOptionSelected(selectedOption: any) {
    console.log('Selected option:', selectedOption);
    this.clearSearch();
    const selected = selectedOption;
    if (!selected) return;

    if (selected.type === 'SUBPRODUCT') {
      this.router.navigate([
        `/units/${selected.unitId}/companies/${selected.companyId}/products/${selected.productId}/subproducts`
      ]);
    } else if (selected.type === 'PRODUCT') {
      this.router.navigate([
        `/units/${selected.unitId}/companies/${selected.companyId}/products`
      ]);
    } else if (selected.type === 'COMPANY') {
      this.router.navigate([
        `/units/${selected.unitId}/companies`
      ]);
    } else if (selected.type === 'UNIT') {
      this.router.navigate([
        `/units`
      ]);
    } else {
      // Fallback: do nothing or show error
    }
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }
}
