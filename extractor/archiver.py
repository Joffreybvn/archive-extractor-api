
import os
import io
import rarfile
import py7zr
import tarfile
from zipfile import ZipFile


class Archiver:

    def __init__(self):

        self.extract_functions = {
            "application/x-rar-compressed": self._extract_rar,
            "application/x-7z-compressed": self._extract_7z,
            "application/x-tar": self._extract_tar
        }
        self.types = self.extract_functions.keys()

    @staticmethod
    def zip_from_directory(directory: str) -> io.BytesIO:

        buffer = io.BytesIO()
        with ZipFile(buffer, 'w', strict_timestamps=False) as zip_buffer:
            for folderName, sub_folders, filenames in os.walk(directory):
                for filename in filenames:
                    file_path = os.path.join(folderName, filename)
                    zip_buffer.write(file_path, os.path.basename(file_path))

        return buffer

    def extract(self, archive_type: str, file, output_dir: str) -> None:
        self.extract_functions[archive_type](file, output_dir)

    @staticmethod
    def _extract_rar(file, output_dir: str) -> None:

        with rarfile.RarFile(file) as archive:
            archive.extractall(output_dir)

    @staticmethod
    def _extract_7z(file, output_dir: str) -> None:

        with py7zr.SevenZipFile(file._file, mode='r') as archive:
            archive.extractall(output_dir)

    @staticmethod
    def _extract_tar(file, output_dir: str) -> None:

        with tarfile.open(fileobj=file) as archive:
            archive.extractall(output_dir)
