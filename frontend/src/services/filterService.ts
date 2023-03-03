import { useSelector } from 'react-redux';
import { FilterTypes } from '../models/Filter';
import { MainAppState } from '../models/states';
import { Categories } from '../models/states/Category';
import { RentStatus } from '../models/states/Rent';
import { setStatusFilter, toggleStatusFilter } from '../store/actions/filterBookingsByStatusAction';
import {
  setCategoryFilter,
  toggleCategoryFilter,
} from '../store/actions/filterGamesByCategoriesAction';
import { FilterTitles } from '../utils/wording';

export default class FilterService {
  constructor(private filterType: FilterTypes) {}

  private getToggleFn() {
    let toggleFn;
    switch (this.filterType) {
      case FilterTypes.Category:
        toggleFn = toggleCategoryFilter;
        break;
      case FilterTypes.Status:
        toggleFn = toggleStatusFilter;
        break;
    }
    return toggleFn;
  }

  private getSetFilterFn() {
    let setFilterFn;
    switch (this.filterType) {
      case FilterTypes.Category:
        setFilterFn = setCategoryFilter;
        break;
      case FilterTypes.Status:
        setFilterFn = setStatusFilter;
        break;
    }
    return setFilterFn;
  }

  private getFilteredElements() {
    let filteredElements;
    useSelector((state: MainAppState) => {
      switch (this.filterType) {
        case FilterTypes.Status:
          filteredElements = state.filterBookingsByStatus.filters;
          break;
        case FilterTypes.Category:
          filteredElements = state.filterGamesByCategories.filters;
          break;
      }
    });
    return filteredElements;
  }

  private getFilters() {
    let items;
    switch (this.filterType) {
      case FilterTypes.Category:
        items = Object.values(Categories);
        break;
      case FilterTypes.Status:
        items = Object.values(RentStatus);
        break;
    }
    return items;
  }

  private getTitle() {
    let title;
    switch (this.filterType) {
      case FilterTypes.Category:
        title = FilterTitles.CATEGORY;
        break;
      case FilterTypes.Status:
        title = FilterTitles.RENT_STATUS;
        break;
    }
    return title;
  }

  public get reduxAssets() {
    const toggleFilter = this.getToggleFn();
    const setFilter = this.getSetFilterFn();
    const filteredElements = this.getFilteredElements();
    console.log(setFilter, filteredElements);
    const filters = this.getFilters();
    const title = this.getTitle();
    return { toggleFilter, setFilter, filteredElements, filters, title };
  }
}
