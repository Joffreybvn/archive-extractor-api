
import os
import tempfile
from fastapi import FastAPI, UploadFile, File, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from . import Archiver


archiver = Archiver()
app = FastAPI(
    title="Archive Extractor API",
    description="API to extract .rar files into .zip",
    version="1.0.0",
    docs_url=None,
    redoc_url=None
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # https://xtract.cx
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "status": True,
        "detail": "Xtract API is online and working."
    }


@app.post("/extract")
async def extract_rar(file: UploadFile = File(...)):

    # Check if the input file as a rar archive
    if file.content_type in archiver.types:

        # Create a temporary directory to extract archive content
        with tempfile.TemporaryDirectory() as output_dir:

            # Extract the files
            error_message = archiver.extract(file.content_type, file.file, output_dir)

            # Return an error message
            if error_message:
                return JSONResponse(
                    content=jsonable_encoder({'detail': error_message}),
                    status_code=500
                )

            # Create a zip archive
            buffer = archiver.zip_from_directory(output_dir)

            archive_name, _ = os.path.splitext(file.filename)
            return Response(
                buffer.getvalue(),
                status_code=201,
                media_type="application/x-zip-compressed",
                headers={
                    'Content-Disposition': f'attachment;filename={archive_name}.zip'
                })
