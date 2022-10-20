import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class customCacheManager {

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async cache(key: string, item: string, ttl?: number) {

        await this.cacheManager.set(key, item, ttl);
    }

    async getCached(T: any, key: string) {

        const value = await this.cacheManager.get<typeof T>(key);

        return value;
    }
}