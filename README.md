<div align="center">
    <a align="center" href="https://nestjs.com/" target="_blank">
      <img src="https://raw.githubusercontent.com/goopen-bit/nestjs-ioredis-provider/main/assets/logo-small.svg" alt="NestJS" height=200/>
    </a>
    <a align="center" href="https://github.com/luin/ioredis" target="_blank">
      <img src="https://raw.githubusercontent.com/goopen-bit/nestjs-ioredis-provider/main/assets/ioredis.svg" alt="ioredis" height=200/>
    </a>
    <h1 align="center">Tiny NestJS provider for ioredis</h1>
  <br/>
</div>

# NestJS provider for ioredis client and cluster

## 1. Install

```shell
npm install @goopen/nestjs-ioredis-provider ioredis
```

## 2. Register the provider

```typescript
@Module({
  imports: [
    RedisModule.register({
      url: redisUrl,
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
```

## 3. You're then able to use the injector to use the Redis

```typescript
@Injectable()
export class AppService{
  constructor(
    @InjectRedis() private readonly redisClient: Redis,
  ) {}
}
```

## The library also provides a health indicator that can be used with terminus

### 1. Import health indicator

```typescript
@Module({
  imports: [TerminusModule],
  providers: [HealthService, RedisHealthIndicator],
})
export class HealthModule {}
```

### 2. Use `isHealthy` method from health indicator

```typescript
@Injectable()
export class HealthService{
  constructor(
    private redis: RedisHealthIndicator,
  ) {}

  pingRedis() {
    return () => this.redis.isHealthy('redis');
  }
}
```
