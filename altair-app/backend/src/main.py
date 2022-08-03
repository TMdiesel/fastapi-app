import altair as alt
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def index():
    return {"message": "Hello World"}


def _plot_bar():
    source = pd.DataFrame(
        {
            "a": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
            "b": [28, 55, 43, 91, 81, 53, 19, 87, 52],
        }
    )
    chart = alt.Chart(source).mark_bar().encode(x="a", y="b")
    return chart


@app.get("/bar", response_class=JSONResponse)
async def read_bar():
    bar = _plot_bar()
    return JSONResponse(content=bar.to_json())
