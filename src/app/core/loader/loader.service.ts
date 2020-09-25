import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {
    public static fullLoadingCount = 0;
    public static smallLoadingCount = 0;
    public static FULL_LOADER = 'full';
    public static SMALL_LOADER = 'small';

    getSmallLoaderCount(): number {
        return LoaderService.smallLoadingCount;
    }

    getFullLoaderCount(): number {
        return LoaderService.fullLoadingCount;
    }

    showLoader(loaderType = LoaderService.FULL_LOADER): void {
        if (loaderType === LoaderService.FULL_LOADER) {
            LoaderService.fullLoadingCount++;
        } else if (loaderType === LoaderService.SMALL_LOADER) {
            LoaderService.smallLoadingCount++;
        }
    }

    hideLoader(loaderType = LoaderService.FULL_LOADER): void {
        if (loaderType === LoaderService.FULL_LOADER) {
            LoaderService.fullLoadingCount--;
        } else if (loaderType === LoaderService.SMALL_LOADER) {
            LoaderService.smallLoadingCount--;
        }
    }
}