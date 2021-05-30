
import os
import tempfile
from fastapi import APIRouter, UploadFile, File, Response
from .. import Archiver

archiver = Archiver()
router = APIRouter(
    prefix="/extract",
    tags=["extract"]
)


@router.post("/rar")
async def extract_rar(file: UploadFile = File(...)):

    # Check if the input file as a rar archive
    if file.content_type == "application/x-rar-compressed":

        # Create a temporary directory to extract archive content
        with tempfile.TemporaryDirectory() as output_dir:

            # Extract the files to a zip archive
            archiver.extract_rar(file.file, output_dir)
            buffer = archiver.zip_from_directory(output_dir)

            archive_name, _ = os.path.splitext(file.filename)
            return Response(
                buffer.getvalue(),
                media_type="application/x-zip-compressed",
                headers={
                    'Content-Disposition': f'attachment;filename={archive_name}.zip'
                })
