## 起動方法

```bash
1.ビルドする
docker compose build

２．起動する
docker compose up -d

3.Containerに直接はいる場合は、container_nameを指定。
  例えばプロジェクトを作ったりpipで追加パッケージを入れるとか
docker compose exec python bash

4. Container停止
docker compose stop

※Containerを削除する場合は
docker compose down

※コンテナ再起動(停止と起動を同時に)
docker stop $(docker compose ps -a -q) && docker compose up -d
```
