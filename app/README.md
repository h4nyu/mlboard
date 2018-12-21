
## api
### フレームワーク


* [flask](http://flask.pocoo.org/)
    軽量ウェブアプリフレームワーク

* [keras](https://keras.io/)
    機械学習フレームワーク

* [gunicorn](http://gunicorn.org/)
    WSGI（Web Server Gateway Interface）でサポートされているWebサーバとWebアプリケーションをつなぐサーバ


## ファイル構成

```
.
|-- .coverage...カバレッジの設定ファイル
|-- .dockerignore...docker buildで無視するファイルを記載
|-- .gitignore...gitで無視するファイルを記載
|-- .keras
|   `-- keras.json...kerasの設定
|-- Dockerfile...docker コンテナbuildの設定
|-- README.md
|-- app.cfg...サーバの設定，DBの接続先など
|-- app.py...アプリサーバのエントリーポイント
|-- cron.py...cronタスクのエントリーポイント
|-- dev-requirements.in...開発時のパッケージリスト
|-- dev-requirements.txt...開発時のパッケージリストとその依存パッケージリスト
|-- docker-compose.yml...コンテナ起動設定
|-- entrypoint.sh...コンテナのエントリーポイント
|-- osca_api...apiパッケージのコード
|   |-- __init__.py
|   |-- app.cfg
|   |-- encorders.py
|   |-- jobs.py
|   |-- models...DBの操作関連
|   |-- ops...機械学習関連
|   |-- static...静的ファイル
|   |-- tasks...luigiタスク関連
|   |-- utlis
|   |-- view.py
|   |-- waveform.py
|   `-- webapi...webApi関連
|-- pytest.ini...テスト設定
|-- requirements.in...外部パッケージリスト
|-- requirements.txt...外部パッケージとその依存パッケージリスト
|-- setup.py...pythonパッケージのセットアップファイル
`-- tests...テストコード
    |-- .coverage
    |-- __init__.py
    |-- fixture
    |-- test_base_layers.py
    |-- test_converter.py
    |-- test_dao.py
    |-- test_dao_raise.py
    |-- test_database.py
    |-- test_deserialize.py
    |-- test_event_condition.py
    |-- test_event_feature.py
    |-- test_event_splitter.py
    |-- test_extract.py
    |-- test_keras_model.py
    |-- test_layers.py
    |-- test_process_extractor.py
    |-- test_process_splitter.py
    |-- test_query.py
    |-- test_restore_model.py
    |-- test_schema.py
    |-- test_serialize.py
    |-- test_summary.py
    |-- test_summary_api.py
    |-- test_tasks.py
    |-- test_unpack.py
    |-- test_views.py
    `-- test_webapi_get.py

```
