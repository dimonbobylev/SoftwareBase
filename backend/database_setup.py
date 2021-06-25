import sys
# для настройки баз данных
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime

# для определения таблицы и модели
from sqlalchemy.ext.declarative import declarative_base

# для создания отношений между таблицами
from sqlalchemy.orm import relationship

# для настроек
from sqlalchemy import create_engine

# создание экземпляра declarative_base
Base = declarative_base()

# здесь добавим классы
class Soft(Base):
    __tablename__ = 'soft'

    id = Column(Integer, primary_key=True)
    inv = Column(String(50), nullable=False)
    date = Column(DateTime(), nullable=False)
    article = Column(String(21), nullable=False)
    os = Column(String(21))
    title = Column(String(150))

# создает экземпляр create_engine в конце файла
engine = create_engine('sqlite:///soft-collection.db')

Base.metadata.create_all(engine)