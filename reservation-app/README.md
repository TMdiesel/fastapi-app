# reservation-app

会議室予約アプリです。

## 構成

- frontend: Streamlit
- backend: FastAPI
- DB: SQLite

## 実行方法

```python
# uvicornサーバーの起動
poetry run uvicorn sql_app.main:app --reload
# Streamlitサーバーの起動
poetry run streamlit run app.py
```

## 参考

- [Udemy Web API 講座](https://www.udemy.com/course/python-fastapi/)
- [FastAPI](https://fastapi.tiangolo.com/ja/)
- [Streamlit](https://streamlit.io/)
