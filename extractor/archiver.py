
import os
import io
import rarfile
from typing import Union
from zipfile import ZipFile


class Archiver:

    def __init__(self):

        self.extract_functions = {
            # RAR .rar
            "application/vnd.rar": self._extract_rar,
            "application/x-rar-compressed": self._extract_rar
        }
        self.types = self.extract_functions.keys()

    @staticmethod
    def zip_from_directory(directory: str) -> io.BytesIO:

        buffer = io.BytesIO()
        with ZipFile(buffer, 'w') as zip_buffer:
            for folderName, sub_folders, filenames in os.walk(directory):
                for filename in filenames:
                    file_path = os.path.join(folderName, filename)
                    zip_buffer.write(file_path, os.path.basename(file_path))

        return buffer

    def extract(self, archive_type: str, file, output_dir: str) -> Union[str, bool]:
        return self.extract_functions[archive_type](file, output_dir)

    @staticmethod
    def _extract_rar(file, output_dir: str) -> Union[str, bool]:

        with rarfile.RarFile(file) as writer:
            try:
                writer.extractall(output_dir)

            except rarfile.PasswordRequired:
                return "Your file is protected by a password"
            else:
                return False
