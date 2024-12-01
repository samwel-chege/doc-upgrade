from . import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone

class Document(db.Model, SerializerMixin):
    __tablename__ = 'documents'

    serialize_rules = ('-suggestions_relation.document', '-history.document')

    id = db.Column(db.Integer, primary_key=True)
    upload_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    # status = db.Column(db.String(20), default='pending', nullable=False)
    original_content = db.Column(db.Text, nullable=False)
    improved_content = db.Column(db.Text)
    # suggestions = db.Column(db.Text)  

    # One-to-Many: A document can have multiple suggestions
    suggestions_relation = db.relationship('Suggestion', backref='document', lazy=True)

    # One-to-Many: A document can have multiple history versions
    history = db.relationship('DocumentHistory', backref='document', lazy=True)

    def __repr__(self):
        return f"<Document {self.id}>"
