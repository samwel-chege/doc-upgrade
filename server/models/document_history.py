from . import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone

class DocumentHistory(db.Model, SerializerMixin):
    __tablename__ = 'document_history'

    id = db.Column(db.Integer, primary_key=True)
    document_id = db.Column(db.Integer, db.ForeignKey('documents.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)  # Use timezone-aware datetime
    content = db.Column(db.Text, nullable=False)
    action = db.Column(db.String(50), nullable=False)  # Example: 'suggested', 'accepted'

    def __repr__(self):
        return f"<DocumentHistory {self.id} for Document {self.document_id}>"
