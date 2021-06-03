from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import extract

app = FastAPI(
    title="Archive Extractor API",
    description="API to extract .rar files into .zip",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['https://xtract.cx'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(extract)


@app.get("/")
async def root():
    return {
        "status": True,
        "message": "Archive Extractor API is online and working !"
    }
