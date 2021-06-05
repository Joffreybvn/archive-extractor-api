
import os
import io
import rarfile
from typing import Tuple, Optional
from zipfile import ZipFile


class Archiver:

    def __init__(self):
        pass

    @staticmethod
    def zip_from_directory(directory: str) -> io.BytesIO:

        buffer = io.BytesIO()
        with ZipFile(buffer, 'w') as zip_buffer:
            for folderName, sub_folders, filenames in os.walk(directory):
                for filename in filenames:
                    file_path = os.path.join(folderName, filename)
                    zip_buffer.write(file_path, os.path.basename(file_path))

        return buffer

    @staticmethod
    def extract_rar(file, output_dir: str) -> Tuple[bool, Optional[str]]:

        with rarfile.RarFile(file) as writer:
            try:
                writer.extractall(output_dir)

            except rarfile.PasswordRequired:
                return False, "Your file is protected by a password"
            else:
                return True, None
