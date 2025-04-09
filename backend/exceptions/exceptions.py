from fastapi import HTTPException, status

"""Base class for custom HTTP exceptions."""
class CustomHTTPException(HTTPException):
    def __init__(self, status_code: int, detail: str, headers: dict = None):
        super().__init__(status_code=status_code, detail=detail, headers=headers)

"""Raise when resource not found."""
class NotFoundException(CustomHTTPException):
    def __init__(self, detail: str = "Resource not found"):
        super().__init__(status.HTTP_404_NOT_FOUND, detail)

"""Raise when user is unauthorized."""
class UnauthorizedException(CustomHTTPException):
    def __init__(self, detail: str = "Unauthorized"):
        super().__init__(status.HTTP_401_UNAUTHORIZED, detail)

"""Raise for invalid requests."""
class BadRequestException(CustomHTTPException):
    def __init__(self, detail: str = "Bad request"):
        super().__init__(status.HTTP_400_BAD_REQUEST, detail)



