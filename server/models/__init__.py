from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin



db = SQLAlchemy()

from .document import Document
from .suggestion import Suggestion
from .document_history import DocumentHistory
from .word import Word  # Importing Word model
from .stopword import StopWord  # Importing StopWord model

app = Flask(__name__)

