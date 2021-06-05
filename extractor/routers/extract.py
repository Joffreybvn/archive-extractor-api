
import os
import tempfile
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi import APIRouter, UploadFile, File, Response
from .. import Archiver, Archive

archiver = Archiver()
router = APIRouter(
    prefix="/extract",
    tags=["extract"]
)


@router.post("/rar")
async def extract_rar(file: UploadFile = File(...)):

    # Check if the input file as a rar archive
    if file.content_type in Archive.RAR.value:

        # Create a temporary directory to extract archive content
        with tempfile.TemporaryDirectory() as output_dir:

            # Extract the files
            outcome, message = archiver.extract_rar(file.file, output_dir)

            # Return an error message
            if not outcome:
                return JSONResponse(
                    content=jsonable_encoder({'message': message}),
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
