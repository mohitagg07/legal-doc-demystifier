from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    Application settings for a database-only backend.
    """
    DATABASE_URL: str = "sqlite:///./sql_app.db"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()