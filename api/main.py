from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts, rorschach, surveys
import os
from authenticator import authenticator

app = FastAPI()

app.include_router(authenticator.router, tags=['Auth'])
app.include_router(accounts.router, tags=['Auth'])
app.include_router(rorschach.router)
app.include_router(surveys.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }
