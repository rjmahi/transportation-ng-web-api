import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { StoApiAccessService } from './sto-api-access.service';
import { CompactSTOModel } from '../models/sto-model';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortDirection } from '../directives/sortable.directive';
import { appInitializerFactory } from '@angular/platform-browser/src/browser/server-transition';

interface SearchResult {
  stoList: CompactSTOModel[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(
  stoList: CompactSTOModel[],
  column: string,
  direction: string
): CompactSTOModel[] {
  if (direction === '') {
    return stoList;
  } else {
    return [...stoList].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(stoModel: CompactSTOModel, term: string, pipe: PipeTransform) {
  return (
    stoModel.vin_num.toLowerCase().includes(term) ||
    stoModel.ext_color.toLowerCase().includes(term) ||
    stoModel.fsc_name.toLowerCase().includes(term)
  );
}

@Injectable({ providedIn: 'root' })
export class StoHandlerService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _stoList$ = new BehaviorSubject<CompactSTOModel[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private MockData;

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, public api: StoApiAccessService) {
    this.prepareData(0);
  }

  prepareData(stoListType) {
    this._state.page = 1;
    this.api.getSTORecords(stoListType).subscribe(
      response => {
        if (response != null) {
          this.MockData = response;
          // console.log(this.MockData);

          this._search$
            .pipe(
              tap(() => this._loading$.next(true)),
              debounceTime(200),
              switchMap(() => this._search()),
              delay(200),
              tap(() => this._loading$.next(false))
            )
            .subscribe(result => {
              this._stoList$.next(result.stoList);
              this._total$.next(result.total);
            });

          this._search$.next();
        }
      },
      error => {
        console.log('Un resolved error - ' + error);
      }
    );
  }

  get stoRecords$() {
    return this._stoList$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {
      sortColumn,
      sortDirection,
      pageSize,
      page,
      searchTerm
    } = this._state;

    // 1. sort
    let stoList = sort(this.MockData, sortColumn, sortDirection);

    // 2. filter
    stoList = stoList.filter(stoModel =>
      matches(stoModel, searchTerm, this.pipe)
    );
    const total = stoList.length;

    // 3. paginate
    stoList = stoList.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ stoList, total });
  }
}
